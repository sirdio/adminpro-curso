import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

// Servicios
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificarTokenGuard implements CanActivate {

  constructor( 
              public router: Router,
              public _usuarioServices: UsuarioService,
  ){ }

  canActivate(): Promise<boolean> | boolean {
    // console.log( 'verifica token' );

    let token = this._usuarioServices.token;
    let payload = JSON.parse( atob( token.split( '.' )[1] ));
    let expirado = this.expirado( payload.exp );
    if (expirado) {
      // console.log( 'expirado' );
      this.router.navigate(['/login']);
      return false;
    }
  
    return this.verificarRenovar( payload.exp );
  }

  verificarRenovar( fechaExp: number ): Promise<boolean> {
    // console.log( 'entra en promesa' );
    return new Promise( ( resolve, reject ) => {  
      let tokenExp = new Date( fechaExp * 1000 ); //fecha en milisiegundos
      let ahora = new Date();
      ahora.setTime( ahora.getTime() + ( 1 * 60 * 60 * 1000 ) );
      if ( tokenExp.getTime() > ahora.getTime() ) {
        // console.log( 'tokenExp.getTime() > ahora.getTime()' );
        // console.log( tokenExp.getTime()  );
        // console.log(  ahora.getTime() );
        
        resolve( true );
      }else {
        // console.log( '---------------------------------------' );
        // console.log( tokenExp.getTime()  );
        // console.log(  ahora.getTime() );
        this._usuarioServices.renovarToken()
            .subscribe( () => {  
              // console.log( 'resolve' );
              resolve( true );
            }, () => {  
              // console.log( 'reject' );
                reject( false );
                this.router.navigate(['/login']);
            } 
        );

      }
      resolve( true );
    } );

  }

  expirado( fechaExp: number ) {
    
    let ahora = new Date().getTime() / 1000;
    if ( fechaExp < ahora) {
      // console.log( 'expiro true' );
      return true;
    }else {
      // console.log( 'expiro false' );
      return false;
    }
    

  }
  
}
