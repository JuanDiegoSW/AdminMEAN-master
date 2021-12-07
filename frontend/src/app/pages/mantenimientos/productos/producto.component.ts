import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Producto } from 'src/app/models/producto.model';
import { Categoria } from 'src/app/models/categoria.model';

import { ProductoService } from 'src/app/services/producto.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { delay } from 'rxjs/operators';
import { FileUploadService } from 'src/app/services/file-upload.service';



@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles:[
  ]
})
export class ProductoComponent implements OnInit {


  public productoForm : FormGroup;
  public categorias : Categoria[] = [];
  public producto : Producto;

  public productoSeleccionado : Producto;
  public categoriaSeleccionado :  Categoria;

  public imagenSubir: File;
  public imgTemp: any = null;


  constructor(private fb: FormBuilder,
              private categoriaService: CategoriaService,
              private productoService: ProductoService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    this.activatedRoute.params
        .subscribe( ({ id }) => this.cargarProducto( id ) );

    this.productoForm = this.fb.group({
      nombre: ['', Validators.required ],
      stock : ['', Validators.required ],
      precio: ['', Validators.required ],
      categoria: ['', Validators.required ],
    });

    this.cargarCategoria();

    this.productoForm.get('categoria').valueChanges
        .subscribe( categoriaId => {
          this.categoriaSeleccionado = this.categorias.find( c => c._id === categoriaId );
        })
  }

  cargarProducto(id: string) {

    if ( id === 'nuevo' ) {
      return;
    }

     this.productoService.obtenerProductoPorId( id )
      .pipe(
        delay(100)
      )
      .subscribe( producto => {

        if ( !producto ) {
          return this.router.navigateByUrl(`/dashboard/productos`);
        }

        const { nombre, stock, precio, categoria:{ _id } } = producto;

        this.productoSeleccionado = producto;


        this.productoForm.setValue({ nombre, stock, precio, categoria: _id });
      });

  }


  cargarCategoria() {

    this.categoriaService.cargarCategorias()
      .subscribe( (categorias: Categoria[]) => {
        this.categorias = categorias;
      })

  }

  guardarProducto() {

    const { nombre } = this.productoForm.value;

    if ( this.productoSeleccionado ) {
      // actualizar
      const data = {
        ...this.productoForm.value,
        _id: this.productoSeleccionado._id
      }
      this.productoService.actualizarProducto( data )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');
        })

    } else {
      // crear
      console.log(this.productoForm.value);

      this.productoService.crearProducto( this.productoForm.value )

          .subscribe( (resp: any) => {
            Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/producto`)
        })
    }
  }

  cambiarImagen( file: File ) {
    this.imagenSubir = file;

    if ( !file ) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen() {

    this.fileUploadService
      .actualizarFoto( this.imagenSubir, 'productos', this.producto._id )
      .then( img => {
        this.producto.img = img;
        Swal.fire('Guardado', 'Imagen de producto actualizada', 'success');
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })

  }

}
