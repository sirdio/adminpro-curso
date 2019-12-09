import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor(
              public _subirArchivoService: SubirArchivoService,
              public _modalUploadService: ModalUploadService,
  ) { 
    console.log( 'modal listo' );
   }

  ngOnInit() {
  }

  seleccionImagen( archivo: File ){
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0 ) {
      Swal.fire("Solo Imagen.", 'El archivo seleccionado no es una imagen.', "error");
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    // vanilla javaScript nativo
    let reader = new FileReader();
    let urlImagenTemporal = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp = reader.result;
  }
  
  subirImagen() {
    this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id )
          .then((resp) => { 
            console.log( resp );
            this._modalUploadService.notificacion.emit( resp );
            this.cerrarModal();

           })
          .catch((err) => { 
              console.log( 'Error en la carga del archivo.....' );
            });
  
  }

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;
    this._modalUploadService.ocultarModal();
  }

}
