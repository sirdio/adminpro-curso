import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

menu:any = [
  {
    titulo:"Principal",
    icono:"mdi mdi-gauge",
    submenu:[
      {titulo:"Dashoard", url:"/dashboard"},
      {titulo:"ProgressBar", url:"/progress"},
      {titulo:"Graficas", url:"/graficas1"},
      { titulo:"Promesas", url:"/promesas" },
      { titulo:"Reactiv-js", url:"/rxjs" },
    ]
  }
];


  constructor() { }
}
