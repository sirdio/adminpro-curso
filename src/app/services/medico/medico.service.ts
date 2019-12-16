import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

// archivo configuracion con variables y constantes globales
import { URL_SERVICIOS } from '../../config/config';

/// Modelos
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';

/// servicios
import { UsuarioService } from '../usuario/usuario.service';


import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;
  token: string;

  constructor(
              public http: HttpClient,
              public _usuarioService: UsuarioService,
  ) { 
    this.token = this._usuarioService.token;
   }

   obtenerMedico( id: string ) {
    let url = `${ URL_SERVICIOS }/medico/${ id }`;
    return this.http.get( url ).pipe(
        map( (resp: any) => resp.medico ));

   }

  cargarMedicos(desde: number = 0 ) {
    let url = `${ URL_SERVICIOS }/medico?desde=${ desde }`;
    return this.http.get( url ).pipe(
        map( ( resp: any ) => { 
          this.totalMedicos = resp.total;
          return resp.medicos;          
         })
    );
  }

  buscarMedicos( termino: string ){
    let url = `${ URL_SERVICIOS }/busqueda/coleccion/medicos/${ termino }`;
    return this.http.get( url ).pipe( map( ( resp: any ) =>{ 
      this.totalMedicos = resp.medicos.length;
      return resp.medicos;
    } ) );
  
  }

  borrarMedico( id: string ) {
    let url = `${ URL_SERVICIOS }/medico/${ id }?token=${ this.token }`;
     return this.http.delete( url ).pipe(
           map((resp) => { 
             Swal.fire('Borrado', 'El médico se ha borrado con exito.', 'success');
             return true;
           }
     ));
  }

  guardarMedico( medico: Medico) {
    if (medico._id) {
      /// Actualizo Medico
      let url = `${ URL_SERVICIOS }/medico/${ medico._id }?token=${ this.token }`;
      return this.http.put(url, {nombre: medico.nombre, id_hospital: medico.hospital} ).pipe(
        map((resp: any) => { 
          Swal.fire( 'Médico Actualizado', `El Médico ${ resp.medico.nombre } se ha Actualizado con exito.`, 'success' );
          return resp.medico;
         })
      );
    } else {
      /// Creo Medico
      let url = `${ URL_SERVICIOS }/medico?token=${ this.token }`;
      return this.http.post( url, {nombre: medico.nombre, id_hospital: medico.hospital} ).pipe(
        map((resp: any) => { 
          Swal.fire( 'Médico Creado', `El Médico ${ resp.medico.nombre } se ha creado con exito.`, 'success' );
          return resp.medico;
         })
      );    
    }

  }

}
