import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Producto }from '../../../models/producto.model'
import { Categoria } from '../../../models/categoria.model'

import { ProductoService } from '../../../services/producto.service';
import { CategoriaService } from '../../../services/categoria.service';

import { FileUploadService } from 'src/app/services/file-upload.service';

import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles:[
  ]
})
export class ProductoComponent implements OnInit {

  public producto : Producto;
  public productoForm : FormGroup;
  public categorias : Categoria[] = []

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

        const { nombre, categoria:{ _id } } = producto;
        this.productoSeleccionado = producto;
        console.log(this.productoSeleccionado);

        this.productoForm.setValue({ nombre, categoria: _id });
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

      this.productoService.crearProducto( this.productoForm.value )
          .subscribe( (resp: any) => {
            Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/medico/${ resp.medico._id }`)
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
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })

  }

}
