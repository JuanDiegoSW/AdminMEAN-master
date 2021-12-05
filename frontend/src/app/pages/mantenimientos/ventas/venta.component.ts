import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProductoService } from 'src/app/services/producto.service';

import { Producto } from 'src/app/models/producto.model';
import { Cliente } from 'src/app/models/cliente.model';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentaComponent implements OnInit {
  public cargando: boolean = true;
  public clientes : Cliente [] = [];
  public productos: Producto[] = [];
  venta = {
    cliente: "",
    producto: "",
    cantidad : 0,
    precio : 0,

  }

  constructor(
    private clienteService : ClienteService,
    private productoService: ProductoService,
  ) { }

  ngOnInit(): void {
    this.cargarProductos()
    this.cargarClientes()
  }
  cargarProductos() {
    this.cargando = true;
    this.productoService.cargarProductos()
      .subscribe( productos => {
        this.cargando = false;
        this.productos = productos;
      });
  }

  cargarClientes(){
    this.cargando = true;
    this.clienteService.cargarClientes()
      .subscribe(clientes => {
        this.cargando = false
        this.clientes = clientes
      })
  }

  poner_precio(){
    let data = this.venta.producto.split("-");
    this.venta.precio = Number(data[1]);
  }

}
