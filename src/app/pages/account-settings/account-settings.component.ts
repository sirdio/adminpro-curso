import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services/service.index';



@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public _settings:SettingsService) { }

  ngOnInit() {
    this.colocarChek();
  }

  cambiarColor(tema:string, link:any){
    this.aplicarCheck( link );
    //console.log(tema);
    this._settings.aplicarTema(tema);
    
  }


  aplicarCheck( link:any ){

    let selectorores:any = document.getElementsByClassName('selector');
    for (let ref of selectorores) {
      ref.classList.remove('working');
    } 
    link.classList.add('working');
  }

  colocarChek(){
    let selectorores:any = document.getElementsByClassName('selector');
    let tema = this._settings.ajustes.tema;
    for (let ref of selectorores) {
      if ( ref.getAttribute('data-theme')=== tema ) {
        ref.classList.add('working');
        break;
      }
    } 
  }

}
