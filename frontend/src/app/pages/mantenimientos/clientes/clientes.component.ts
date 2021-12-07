import { Component, OnDestroy, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Cliente } from 'src/app/models/cliente.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  public cargando : boolean = true;
  public clientes : Cliente[] = [];


  constructor(private clienteService: ClienteService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarClientes()
  }
  cargarClientes(){
    this.cargando = true;
    this.clienteService.cargarClientes()
      .subscribe(clientes => {
        this.cargando = false
        this.clientes = clientes
      })
  }
  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.cargarClientes();
    }

    this.busquedasService.buscar( 'clientes', termino )
        .subscribe( resp => {
          this.clientes = resp;
        });
  }
  abrirModal(cliente: Cliente) {

    this.modalImagenService.abrirModal( 'clientes', cliente._id, cliente.img );

  }

  borrarCliente( cliente: Cliente ) {

    Swal.fire({
      title: '¿Borrar Cliente?',
      text: `Esta a punto de borrar a ${ cliente.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {

        this.clienteService.borrarCliente( cliente._id )
          .subscribe( resp => {

            this.cargarClientes();
            Swal.fire(
              'Médico borrado',
              `${ cliente.nombre } fue eliminado correctamente`,
              'success'
            );

          });

      }
    })

  }


}
