import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

// servicios
import { UsuarioService } from '../usuario/usuario.service';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( 
              public router: Router,
              public _usuarioService: UsuarioService
  ) { }

  canActivate( ){
    if (this._usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true;
    } else {
      this._usuarioService.logout();
      //this.router.navigate(['/dashboard']);
      Swal.fire(" Acceso Denegado ", ' Los permisos que posee no le permite acceder a las funciones que desea ingresar.', "warning");
      return false;
    }
  }
  
}
