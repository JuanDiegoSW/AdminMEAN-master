import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';
import { ProductosComponent } from './mantenimientos/productos/productos.component';
import { ProductoComponent } from './mantenimientos/productos/producto.component';
import { CategoriasComponent } from './mantenimientos/categorias/categorias.component';
import { ClientesComponent } from './mantenimientos/clientes/clientes.component';


const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' }},
  { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas' }},
  { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1' }},
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' }},
  { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' }},
  { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }},
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }},

  // Mantenimientos
  //{ path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Matenimiento de Hospitales' }},
  //{ path: 'medicos', component: MedicosComponent, data: { titulo: 'Matenimiento de Medicos' }},
  { path: 'usuarios', canActivate: [ AdminGuard ], component: UsuariosComponent, data: { titulo: 'Matenimiento de Usuarios' }},
  { path: 'categorias', component: CategoriasComponent, data: { titulo: 'Matenimiento de Categorias' }},
  { path: 'productos', component: ProductosComponent, data: { titulo: 'Matenimiento de Productos' }},
  { path: 'clientes', component: ClientesComponent, data: { titulo: 'Matenimiento de Clientes' }},
  //{ path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Matenimiento de Medicos' }},
  { path: 'producto/:id', component: ProductoComponent, data: { titulo: 'Matenimiento de Producto' }},


  // Rutas de Admin

]



@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
