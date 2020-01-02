import {RouterModule, Routes } from "@angular/router";

/// Guards
import { LoginGuardGuard, AdminGuard, VerificarTokenGuard } from '../services/service.index';



import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';




const pagesRoutes: Routes = [
  { path:'dashboard', component:DashboardComponent, canActivate: [ VerificarTokenGuard ], data: { titulo: 'Dashboard' } },
  { path:'progress', component:ProgressComponent,  canActivate: [ VerificarTokenGuard ], data: { titulo: 'Barra de Progreso' } },
  { path:'graficas1', component:Graficas1Component,  canActivate: [ VerificarTokenGuard ], data: { titulo: 'Gráficas de Donnas' } },
  { path:'promesas', component:PromesasComponent,  canActivate: [ VerificarTokenGuard ], data: { titulo: 'Promesas' } },
  { path:'rxjs', component:RxjsComponent,  canActivate: [ VerificarTokenGuard ], data: { titulo: 'Rx-Js' } },
  { path:'account-settings', component:AccountSettingsComponent,  canActivate: [ VerificarTokenGuard ], data: { titulo: 'Ajustes del Tema' } },
  { path:'perfil', component:ProfileComponent,  canActivate: [ VerificarTokenGuard ], data: { titulo: 'Perfil de usuario' } },
  { path:'busqueda/:termino', component:BusquedaComponent,  canActivate: [ VerificarTokenGuard ], data: { titulo: 'Resultado de la busqueda' } },             
          // Mnatenimientos
  { path:'usuarios', component:UsuariosComponent, canActivate: [ AdminGuard, VerificarTokenGuard ], data: { titulo: 'Mantenimiento de usuario' } },
  { path:'hospitales', component:HospitalesComponent, canActivate: [ VerificarTokenGuard ], data: { titulo: 'Mantenimiento de Hospital' } },
  { path:'medicos', component:MedicosComponent, canActivate: [ VerificarTokenGuard ], data: { titulo: 'Mantenimiento de Médicos' } },
  { path:'medico/:id', component:MedicoComponent, canActivate: [ VerificarTokenGuard ], data: { titulo: 'Actualizar de Médicos' } },
  { path:'medico/:id', component:MedicoComponent, canActivate: [ VerificarTokenGuard ], data: { titulo: 'Actualizar de Médicos' } },             

  { path:'', redirectTo:'/dashboard', pathMatch: 'full' }

];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );

// const pagesRoutes: Routes = [
//   { 
//       path:'', 
//       component:PagesComponent,
//       canActivate: [ LoginGuardGuard ],
//       children:[
//         { path:'dashboard', component:DashboardComponent, data: { titulo: 'Dashboard' } },
//         { path:'progress', component:ProgressComponent, data: { titulo: 'Barra de Progreso' } },
//         { path:'graficas1', component:Graficas1Component, data: { titulo: 'Gráficas de Donnas' } },
//         { path:'promesas', component:PromesasComponent, data: { titulo: 'Promesas' } },
//         { path:'rxjs', component:RxjsComponent, data: { titulo: 'Rx-Js' } },
//         { path:'account-settings', component:AccountSettingsComponent, data: { titulo: 'Ajustes del Tema' } },
//         { path:'perfil', component:ProfileComponent, data: { titulo: 'Perfil de usuario' } },
//         { path:'busqueda/:termino', component:BusquedaComponent, data: { titulo: 'Resultado de la busqueda' } },             
//         // Mnatenimientos
//         { path:'usuarios', component:UsuariosComponent, canActivate: [ AdminGuard ], data: { titulo: 'Mantenimiento de usuario' } },
//         { path:'hospitales', component:HospitalesComponent, data: { titulo: 'Mantenimiento de Hospital' } },
//         { path:'medicos', component:MedicosComponent, data: { titulo: 'Mantenimiento de Médicos' } },
//         { path:'medico/:id', component:MedicoComponent, data: { titulo: 'Actualizar de Médicos' } },
//         { path:'medico/:id', component:MedicoComponent, data: { titulo: 'Actualizar de Médicos' } },             

//         { path:'', redirectTo:'/dashboard', pathMatch: 'full' }
//       ] 
//     }
// ];