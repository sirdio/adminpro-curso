import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes:Ajustes ={
    temaUrl: 'assets/css/colors/default.css',
    tema:'default'
  };
  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
   }
  
  guardarAjustes(){
    //console.log("Guardado en el LocalStorage");
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));

  }

  cargarAjustes(){
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));  
      //console.log("Ajustes Cargado de LocalStorage");
      this.aplicarTema(this.ajustes.tema);  
    }else{
      //console.log("Usuando Valores Por defecto");
      this.aplicarTema(this.ajustes.tema);  
    }
  }

  aplicarTema(tema:string){
    let tema_Url = `assets/css/colors/${tema}.css`;
    this._document.getElementById( 'tema' ).setAttribute( 'href', tema_Url );
    this.ajustes.temaUrl = tema_Url;
    this.ajustes.tema = tema;
    this.guardarAjustes();    
  }

}


interface Ajustes {
  temaUrl:string,
  tema:string
}