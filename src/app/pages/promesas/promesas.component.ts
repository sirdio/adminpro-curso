import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() { 
    this.contarTres().then(mensaje => console.log("termino", mensaje)).catch(error => console.error("error en la promesa", error));
  }

  ngOnInit() {
  }

  contarTres():Promise<string>{
    //let promesa = new Promise((resolve, reject)=>{
      return new Promise((resolve, reject)=>{
      let contador = 0;
      let intervalo = setInterval( ( ) => {
        contador += 1;
        console.log(contador);
        if (contador === 3) {
          resolve('OK!!!....');
          //reject('se ha detenido....');
          clearInterval(intervalo);
        }
       }, 1000);
    });
  }

}
