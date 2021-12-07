import { Component, OnDestroy, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Proveedor } from './../../../models/proveedor.model';
// Services
import { ProveedorService } from '../../../services/proveedor.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';


@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})

export class ProveedoresComponent implements OnInit {

  public cargando : boolean = true;
  public proveedores : Proveedor[] = [];

  constructor(private proveedorService: ProveedorService,
    private ModalImagenService: ModalImagenService,
    private BusquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarProveedores()
  }

  cargarProveedores(){
    this.cargando = true;
    this.proveedorService.cargarProveedores()
      .subscribe(proveedores => {
        this.cargando = false
        this.proveedores = proveedores
        console.log(this.proveedores)
    })
  }
  // buscar( termino: string ){
  //   if ( termino.length === 0 ){
  //     return this.cargarProveedores();
  //   }

  //   this.BusquedasService.buscar( 'proveedores', termino )
  //     .subscribe( resp => {
  //       this.proveedores = resp;
  //     });
  // }

  borrarProveedor( proveedor: Proveedor ) {

    Swal.fire({
      title: '¿Borrar proveedor?',
      text: `Esta a punto de borrar a ${ proveedor.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {

        this.proveedorService.borrarProveedor( proveedor._id )
          .subscribe( resp => {
            this.cargarProveedores();
            Swal.fire(
              'Proveedor borrado',
              `${ proveedor.nombre } fue eliminado correctamente`,
              'success'
            );

          });

      }
    })

  }

}
