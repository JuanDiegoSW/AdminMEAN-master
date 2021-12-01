import { Component, OnDestroy, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Producto } from 'src/app/models/producto.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { ProductoService } from 'src/app/services/producto.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: []
})
export class ProductosComponent implements OnInit, OnDestroy {

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

    this.busquedasService.buscar( 'productos', termino )
        .subscribe( resp => {
          this.productos = resp;
        });
  }

  abrirModal(producto: Producto) {

    this.modalImagenService.abrirModal( 'productos', producto._id, producto.img );

  }

  borrarMedico( producto: Producto ) {

    Swal.fire({
      title: '¿Borrar médico?',
      text: `Esta a punto de borrar a ${ producto.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {

        this.productoService.borrarProducto( producto._id )
          .subscribe( resp => {

            this.cargarProductos();
            Swal.fire(
              'Médico borrado',
              `${ producto.nombre } fue eliminado correctamente`,
              'success'
            );

          });

      }
    })

  }

}
