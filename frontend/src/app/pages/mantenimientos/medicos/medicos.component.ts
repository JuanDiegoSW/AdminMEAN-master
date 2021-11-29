/***
 * Esta Modificacion es para para los productos como un TEst
 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Producto } from '../../../models/producto.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { ProductoService } from '../../../services/producto.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public productos: Producto[] = [];
  private imgSubs: Subscription;

  constructor( private productoService: ProductoService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.cargarProductos();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarProductos() );
  }

  cargarProductos() {
    this.cargando = true;
    this.productoService.cargarProductos()
      .subscribe( productos => {
        this.cargando = false;
        this.productos = productos;
      });
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.cargarProductos();
    }
    /*
    this.busquedasService.buscar( 'productos', termino )
        .subscribe( resp => {
          this.productos = resp;
        });*/
  }

  abrirModal(producto: Producto) {

    this.modalImagenService.abrirModal( 'medicos', producto._id, producto.img );

  }

  borrarMedico( producto: Producto ) {
    /*
    Swal.fire({
      title: '¿Borrar médico?',
      text: `Esta a punto de borrar a ${ producto.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {

        this.medicoService.borrarMedico( medico._id )
          .subscribe( resp => {

            this.cargarMedicos();
            Swal.fire(
              'Médico borrado',
              `${ medico.nombre } fue eliminado correctamente`,
              'success'
            );

          });

      }
    })*/

  }

}
