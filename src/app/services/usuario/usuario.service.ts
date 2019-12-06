import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

// archivo configuracion con variables y constantes globales
import { URL_SERVICIOS } from '../../config/config';

// MODELOS
import { Usuario } from 'src/app/models/usuario.model';

// aservicios
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  usuario: Usuario;
  token: string;

  constructor( 
    public router: Router, 
    public http: HttpClient,
    public _subirArchivoService: SubirArchivoService
    ) { 
      this.cargarStorage();
      //console.log('Servico Usuario Listo.');
  }

  logout(){
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
    
  }

  loginGoogle( token: string ){
    let url = `${ URL_SERVICIOS }/login/google`;
    return this.http.post( url, { token })
    .pipe(
      map((resp: any) =>{
        this.guardarStorage( resp.id, resp.token, resp.usuario );
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
    return this.http.post(url, usuario)
            .pipe(
              map((resp: any) =>{
                this.guardarStorage( resp.id, resp.token, resp.usuario );
                return true;
              })
            );
  }

  crearUsuario( usuario: Usuario ){
    let url = `${ URL_SERVICIOS }/usuario`;
    return this.http.post( url, usuario ).pipe(
      map( (resp: any) => {
        Swal.fire("Usuario Creado", usuario.email, "success");
          return resp.usuario;
      })
    );
  }

  guardarStorage( id: string, token: string, usuario: Usuario ){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;

  }

  cargarStorage(){
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

  estaLogueado(){
    return (this.token.length > 5 ) ? true : false;
  }

  actualizarUsuario( usuario: Usuario ) {
    let url = `${ URL_SERVICIOS }/usuario/${ usuario._id }?token=${ this.token }`;
    return this.http.put(url, usuario).pipe(
      map( (resp: any) => {
        let usuarioDB: Usuario = resp.usuario;
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB );
        Swal.fire("Usuario Actualizado", usuario.nombre, "success");
          return true;
      })
    );
  }

  cambiarImagen( archivo: File, id: String ) {

    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
    .then( ( resp: any ) => { 
      // actualiza el campo img del usuario
      this.usuario.img = resp.usuario.img;
      Swal.fire("Imagen Actualizada", this.usuario.nombre, "success");
      this.guardarStorage( this.usuario._id, this.token, this.usuario );
     })
     .catch((resp) => {  
       console.log(resp);
     });


    
  }

}
