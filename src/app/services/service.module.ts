import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// IMPORTA SERVICIOS DESDE UN ARCHIVO INDICE
import { SettingsService, SharedService, SidebarService, UsuarioService, LoginGuardGuard, SubirArchivoService } from "./service.index";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    SubirArchivoService,
    LoginGuardGuard
  ]
})
export class ServiceModule { }
