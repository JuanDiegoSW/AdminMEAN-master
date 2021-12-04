import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';

//import { Hospital } from 'src/app/models/hospital.model';
//import { Medico } from '../../models/medico.model';
import { Usuario } from '../../models/usuario.model';
import { Producto } from 'src/app/models/producto.model';
import { Categoria } from 'src/app/models/categoria.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  //public medicos: Medico[] = [];
  public categorias: Categoria[] = [];
  public productos: Producto[] = [];


  constructor( private activatedRoute: ActivatedRoute,
               private busquedasService: BusquedasService) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe( ({ termino }) => this.busquedaGlobal( termino ));

  }

  busquedaGlobal( termino: string ) {

    this.busquedasService.busquedaGlobal( termino )
        .subscribe( (resp: any) => {
          //console.log(resp)
          this.usuarios   = resp.usuarios;
          //this.medicos    = resp.medicos;
          this.categorias = resp.categorias;
          this.productos  = resp.productos;
        });

  }


  abrirProducto( producto: Producto ) {

  }

}
