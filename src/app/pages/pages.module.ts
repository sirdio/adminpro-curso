import { NgModule } from "@angular/core";

import { FormsModule } from "@angular/forms";

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';

//ng2-charts
import { ChartsModule } from 'ng2-charts';

//temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';



@NgModule({
    declarations: [
        PagesComponent,
       DashboardComponent,
       Graficas1Component,
       ProgressComponent,
       IncrementadorComponent,
       GraficoDonaComponent,
       AccountSettingsComponent
      ],
    exports: [
        PagesComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent
    ],
imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule
    
]
})
export class PagesModule {  }