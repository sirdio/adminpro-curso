import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { throwError, Observable  } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// archivo configuracion con variables y constantes globales
import { URL_SERVICIOS } from '../../config/config';

// MODELOS
import { Usuario } from '../../models/usuario.model';

// aservicios
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  usuario: Usuario;
  token: string;
  menu: any[] = [];
  constructor( 
    public router: Router, 
    public http: HttpClient,
    public _subirArchivoService: SubirArchivoService
    ) { 
      this.cargarStorage();
      //console.log('Servico Usuario Listo.');
  }

  renovarToken( ) {
    let url = `${ URL_SERVICIOS }/login/renovartoken?token=${ this.token }`;
    return this.http.post(url,'none').pipe(
      map( (resp: any) => { 
        this.token = resp.token;
        localStorage.setItem('token', this.token);
        console.log( 'Token Renovado' );
        return true;
       } ),
       catchError( ( err: any ) => { 
         this.router.navigate(['/login']);
         Swal.fire(`Error: token invalido`, 'Falla al intentar renovar token.', 'error' );
         return new Observable<any>( );
       })
    );
  }

  logout(){
    this.token = '';
    this.usuario = null;
    this.menu = [];
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
    
  }

  loginGoogle( token: string ){
    let url = `${ URL_SERVICIOS }/login/google`;
    return this.http.post( url, { token })
    .pipe(
      map((resp: any) =>{
        this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
        return true;
      })
    );
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }
    let url = `${ URL_SERVICIOS }/login`;
    return this.http.post(url, usuario).pipe(
        map((resp: any) =>{
                this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
                return true;
        }), 
        catchError( ( err: any ) => { 
          Swal.fire(`Error: ${ err.status }`, 'Falla al intentar inicar sesión Email o Contraseña incorecta.', 'error' );
          return new Observable<any>( );
        })
      );
  }

  crearUsuario( usuario: Usuario ){
    let url = `${ URL_SERVICIOS }/usuario`;
    return this.http.post( url, usuario ).pipe(
      map( (resp: any) => {
        Swal.fire("Usuario Creado", usuario.email, "success");
          return resp.usuario;
      }),
      catchError( ( err: any ) => { 
        Swal.fire(`Error: ${ err.status } - ${ err.error.mensaje } `, 'El Correo que intenta crear, ya existe en el sistema.', 'error' );
        return new Observable<any>( );
      })
    );
  }

  guardarStorage( id: string, token: string, usuario: Usuario, menu: any ){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

  }

  cargarStorage(){
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem( 'usuario' ) );
      this.menu = JSON.parse( localStorage.getItem( 'menu' ) );
    }else{
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  estaLogueado(){
    return (this.token.length > 5 ) ? true : false;
  }

  actualizarUsuario( usuario: Usuario ) {
    let url = `${ URL_SERVICIOS }/usuario/${ usuario._id }?token=${ this.token }`;
    return this.http.put(url, usuario).pipe(
      map( (resp: any) => {
        if (usuario._id === this.usuario._id) {
          let usuarioDB: Usuario = resp.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu );
        }
        Swal.fire("Usuario Actualizado", usuario.nombre, "success");
          return true;
      }),
      catchError( ( err: any ) => { 
        Swal.fire(`Error: ${ err.status } `,  err.error.mensaje, 'error' );
        return new Observable<any>( );
      })
    );
  }

  cambiarImagen( archivo: File, id: String ) {
    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
    .then( ( resp: any ) => { 
      // actualiza el campo img del usuario
      this.usuario.img = resp.usuario.img;
      Swal.fire("Imagen Actualizada", this.usuario.nombre, "success");
      this.guardarStorage( this.usuario._id, this.token, this.usuario, this.menu );
     })
     .catch((resp) => {  
       console.log(resp);
     });
  }

  getUsuarios( desde: number = 0 ){
    let url = `${ URL_SERVICIOS }/usuario?desde=${ desde }`;
    return this.http.get( url );
  }


  buscarUsuarios( termino: string ){
    let url = `${ URL_SERVICIOS }/busqueda/coleccion/usuarios/${ termino }`;
    // console.log( url );
    // console.log( termino );
    return this.http.get( url ).pipe( map( ( resp: any ) => resp.usuarios ) );
  
  }


  borrarUsuario( id:string ){
    let url = `${ URL_SERVICIOS }/usuario/${ id }?token=${ this.token }`;
    return this.http.delete( url ).pipe(
            map((resp) => { 
              Swal.fire('Borrado', 'El usuario se ha borrado con exito.', 'success');
              return true;
             }),
             catchError( ( err: any ) => { 
               Swal.fire(`Error: ${ err.status } `,  err.error.mensaje, 'error' );
               return new Observable<any>( );
             })
    );

  }




}
