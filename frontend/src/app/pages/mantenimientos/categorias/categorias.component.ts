import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Categoria } from 'src/app/models/categoria.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit, OnDestroy {

  public categorias: Categoria[] = [];
  public cargando : boolean = true;
  public imgSubs : Subscription;

  constructor(
    private categoriaService: CategoriaService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
  ngOnInit(): void {
    this.cargarCategorias();

    this.imgSubs = this.imgSubs =  this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarCategorias());
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.cargarCategorias();
    }

    this.busquedasService.buscar( 'categorias', termino )
        .subscribe( resp => {

          this.categorias = resp;

        });
  }
  cargarCategorias() {

    this.cargando = true;
    this.categoriaService.cargarCategorias()
        .subscribe( categorias => {
          this.cargando = false;
          this.categorias = categorias;
        })

  }

  guardarCambios( categoria: Categoria ) {

    this.categoriaService.actualizarCategoria( categoria._id, categoria.nombre )
        .subscribe( resp => {
          Swal.fire( 'Actualizado', categoria.nombre, 'success' );
        });

  }

  eliminarCategoria( categoria: Categoria ) {

    this.categoriaService.borrarCategoria( categoria._id )
        .subscribe( resp => {
          this.cargarCategorias();
          Swal.fire( 'Borrado', categoria.nombre, 'success' );
        });

  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear Categoria',
      text: 'Ingrese el nombre de la nueva Categoria',
      input: 'text',
      inputPlaceholder: 'Nombre de la Categoria',
      showCancelButton: true,
    });

    if( value.trim().length > 0 ) {
      this.categoriaService.crearCategoria( value )
        .subscribe( (resp: any) => {
          this.categorias.push( resp.categoria )
        })
    }
  }

  abrirModal(categoria: Categoria) {

    this.modalImagenService.abrirModal( 'categorias', categoria._id, categoria.img );

  }

}
