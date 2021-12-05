import { Component, OnInit } from '@angular/core';
//import { ClienteService } from 'src/app/services/cliente.service';
//import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';

import { Venta } from 'src/app/models/venta.model'

import { Subscription } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  public cargando: boolean = true;
  public ventas: Venta[] = [];
  private imgSubs: Subscription;

  constructor(
    private ventaService : VentaService,
    private busquedasService: BusquedasService
    //private clienteService : ClienteService,
    //private productoService: ProductoService,
  ) { }

  ngOnInit(): void {
    //this.cargarProductos()
    //this.cargarClientes()
    this.cargarVentas()
  }
  cargarVentas() {
    this.cargando = true;
    this.ventaService.cargarVentas()
      .subscribe( ventas => {
        this.cargando = false;
        this.ventas = ventas;
      });
  }



}
