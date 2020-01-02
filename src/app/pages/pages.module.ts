import { NgModule } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
//import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';

//ng2-charts
import { ChartsModule } from 'ng2-charts';

//temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';



// pipes Modulo
import { PipesModule } from '../pipes/pipes.module';
import { BusquedaComponent } from './busqueda/busqueda.component';



@NgModule({
    declarations: [
       DashboardComponent,
       Graficas1Component,
       ProgressComponent,
       IncrementadorComponent,
       GraficoDonaComponent,
       AccountSettingsComponent,
       PromesasComponent,
       RxjsComponent,
       ProfileComponent,
       UsuariosComponent,
       HospitalesComponent,
       MedicosComponent,
       MedicoComponent,
       BusquedaComponent
      ],
    exports: [
        DashboardComponent,
        Graficas1Component,
        ProgressComponent
    ],
imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule,
    PipesModule
    
]
})
export class PagesModule {  }