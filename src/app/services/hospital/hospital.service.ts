import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

// archivo configuracion con variables y constantes globales
import { URL_SERVICIOS } from '../../config/config';

/// Modelos
import { Hospital } from '../../models/hospital.model';

/// servicios
import { UsuarioService } from '../usuario/usuario.service';


import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  
  token: string;

  constructor(
              public router: Router, 
              public http: HttpClient,
              public _usuarioService: UsuarioService,
  ) {
    this.token = this._usuarioService.token;
   }

   todosHospitales( ) {
     let url = `${ URL_SERVICIOS }/hospital/todos`;
     return this.http.get( url ).pipe(
       map(( resp: any ) => { 
         return resp.hospitales;
        })
     ); 
   }

   cargarHospitales( desde: number = 0 ) {
    let url = `${ URL_SERVICIOS }/hospital?desde=${ desde }`;
    return this.http.get( url );
   }

   obtenerHospital( id: string ) {
    let url = `${ URL_SERVICIOS }/hospital/${ id }`;
    return this.http.get( url ).pipe(
        map( (resp: any) => resp.hospital ));
   }
   
   borrarHospital( id: string ) {
     let url = `${ URL_SERVICIOS }/hospital/${ id }?token=${ this.token }`;
      return this.http.delete( url ).pipe(
            map((resp) => { 
              Swal.fire('Borrado', 'El hospital se ha borrado con exito.', 'success');
              return true;
            }
      ));
   }
   
   crearHospital( nombre: string ) {
    let url = `${ URL_SERVICIOS }/hospital?token=${ this.token }`;
    return this.http.post( url,{ nombre: nombre} ).pipe(
       map((resp: any) => { 
         Swal.fire("hospital Creado", nombre, "success");
         return resp;
      })
    );
   }

   buscarHospital( termino: string ) {
    let url = `${ URL_SERVICIOS }/busqueda/coleccion/hospitales/${ termino }`;
    return this.http.get(url).pipe( map( ( resp: any ) => resp.hospitales )); 
   }



   actualizarHospital( hospital: Hospital) {

     let url = `${ URL_SERVICIOS }/hospital/${ hospital._id }?token=${ this.token }`;
     return this.http.put(url, hospital).pipe(
         map((resp: any) => { 
          Swal.fire("Nombre de hospital Actualizado", resp.hospital.nombre, "success");
        })
      );
   }




 

}
