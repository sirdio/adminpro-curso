import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


// servicios
import { UsuarioService } from '../services/service.index';

//mdelo
import { Usuario } from '../models/usuario.model';


declare function init_plugins();
declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  email :string;
  recuerdame:boolean = false;
  auth2:any;

  constructor(public _router:Router,
              public _usuarioServices: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 0) {
      this.recuerdame = true;
    }
  }

  googleInit(){
    gapi.load('auth2', ()=>{
      this.auth2 = gapi.auth2.init({
        client_id: '1052461860624-c7otp0kn195g4b8qlnqmoflpc7jv0gd2.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin( document.getElementById( 'btnGoogle' ) );
    });
  }

  attachSignin( element ){
    this.auth2.attachClickHandler(element, {},(googleUser) => {  
      let token = googleUser.getAuthResponse().id_token;
      this._usuarioServices.loginGoogle( token )
      .subscribe( resp => window.location.href='#/dashboard' ); //windows.location.href='#/dashboard' this._router.navigate(['/dashboard'])

    
    });
  }

  ingresar( forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    let usuario = new Usuario( null, forma.value.email, forma.value.password );
    this._usuarioServices.login( usuario, forma.value.recuerdame )
      .subscribe( correcto => this._router.navigate(['/dashboard']) );
  }

}
