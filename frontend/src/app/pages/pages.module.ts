import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { PipesModule } from '../pipes/pipes.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { UsuarioComponent } from './mantenimientos/usuarios/usuario.component';
import { NewusuarioComponent } from './mantenimientos/usuarios/newusuario.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { ProductoComponent } from './mantenimientos/productos/producto.component';
import { ProductonewComponent } from './mantenimientos/productos/productonew.component';
import { ProductosComponent } from './mantenimientos/productos/productos.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { CategoriasComponent } from './mantenimientos/categorias/categorias.component';
import { ClientesComponent } from './mantenimientos/clientes/clientes.component';
import { ClienteComponent } from './mantenimientos/clientes/cliente.component';
import { ClientenewComponent } from './mantenimientos/clientes/clientenew.component'
import { VentasComponent } from './mantenimientos/ventas/ventas.component';
import { ProveedoresComponent } from './mantenimientos/proveedores/proveedores.component';
import { ProveedorComponent } from './mantenimientos/proveedores/proveedor.component';





@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
    UsuarioComponent,
    NewusuarioComponent,
    HospitalesComponent,
    MedicosComponent,
    MedicoComponent,
    BusquedaComponent,
    ProductosComponent,
    ProductoComponent,
    ProductonewComponent,
    CategoriasComponent,
    ClientesComponent,
    ClienteComponent,
    VentasComponent,
    ProveedoresComponent,
    ProveedorComponent,
    ClientenewComponent,
    VentasComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    PipesModule
  ]
})
export class PagesModule { }
