import { Injectable } from '@angular/core';

/// Servicios
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [];
// menu:any = [
//   {
//     titulo:"Principal",
//     icono:"mdi mdi-gauge",
//     submenu:[
//       {titulo:"Dashoard", url:"/dashboard"},
//       {titulo:"ProgressBar", url:"/progress"},
//       {titulo:"Graficas", url:"/graficas1"},
//       { titulo:"Promesas", url:"/promesas" },
//       { titulo:"Reactiv-js", url:"/rxjs" },
//     ]
//   },

//   {
//     titulo:"Mantenimientos",
//     icono: "mdi mdi-account-settings-variant",//"mdi mdi-folder-lock-open",
//     submenu:[
//       {titulo:"Usuarios", url:"/usuarios"},
//       {titulo:"Hospitales", url:"/hospitales"},
//       {titulo:"Médicos", url:"/medicos"}
//     ]
//   }
// ];


  constructor(
              public _usuarioService: UsuarioService
  ) {  }
  
  cargarMenu( ) {
    this.menu = this._usuarioService.menu;
  }
}
