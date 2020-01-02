import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// IMPORTA SERVICIOS DESDE UN ARCHIVO INDICE
import { SettingsService, SharedService, SidebarService, UsuarioService, LoginGuardGuard, HospitalService, SubirArchivoService, MedicoService, AdminGuard, VerificarTokenGuard } from "./service.index";
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';




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
    HospitalService,
    MedicoService,
    SubirArchivoService,
    LoginGuardGuard,
    AdminGuard,
    VerificarTokenGuard,
    ModalUploadService
  ]
})
export class ServiceModule { }
