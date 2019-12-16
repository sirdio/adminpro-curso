import { Component, OnInit } from '@angular/core';


//// Servicios
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

/// Modelos
import { Hospital } from '../../models/hospital.model';

/// Sweet Alert 2
import Swal from 'sweetalert2';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[];
  hospitalesBusqueda: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  bandera: boolean = true;
  terminoBusqueda: string = "";

  constructor(
              public _hospitalService: HospitalService,
              public _modalUploadService: ModalUploadService,
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe((resp) => { 
          if (this.bandera) {
            this.desde = 0;
            this.cargarHospitales();
          } else {
            this.buscarHospitales( this.terminoBusqueda );
          }
    });
  }

  cargarHospitales( ) {
    this.cargando = true;
    this._hospitalService.cargarHospitales(this.desde).subscribe((resp: any) => { 
      this.hospitales = resp.hospitales;
      this.totalRegistros = resp.total;
      this.cargando = false;
    });
  }

  cambiarDesde( valor: number ){

    let desde = this.desde + valor;
    //console.log( desde );
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      desde = 0;
      return;
    }

    if (this.bandera) {
      this.desde += valor;
      this.cargarHospitales();
    } else {
      this.desde += valor;
      this. mostrarBusqueda();
    }
  }
  
buscarHospitales( termino: string ) { 
  this.terminoBusqueda = termino;
  if( termino.length === 0 ) {
    this.cargarHospitales();
    this.bandera = true;
    return;
  }
  this.cargando = true;
  this._hospitalService.buscarHospital( termino )
      .subscribe((hospitales: Hospital[]) => { 
        this.totalRegistros = hospitales.length;
        this.hospitalesBusqueda = hospitales;
        this.cargando = false;
        this.bandera =  false;
        this.desde = 0;
        this.mostrarBusqueda();
       });
}

mostrarBusqueda() {
  let arrayHospitalTemp: Hospital[] =[];
  for (let index = this.desde; index < this.desde + 5; index++) {
    if (index < this.totalRegistros) {
      arrayHospitalTemp.push(this.hospitalesBusqueda[index]);
    }else{
      break;
    }
  }
  this.hospitales = arrayHospitalTemp;
}


guardarHospital( hospital: Hospital ){
    //console.log('actualizando hospital:', hospital );
    this._hospitalService.actualizarHospital( hospital ).subscribe((resp) => { 
      if (this.bandera) {
        this.desde = 0;
        this.cargarHospitales();
      } else {
        this.buscarHospitales( this.terminoBusqueda );
      }
     });
  }

  borrarHospital( hospital: Hospital ) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: `Estas a punto de borrar información del hospital: ${ hospital.nombre }`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this._hospitalService.borrarHospital( hospital._id )
              .subscribe((resp) => {
                if (this.bandera) {
                  this.desde = 0;
                  this.cargarHospitales();
                } else {
                  this.buscarHospitales( this.terminoBusqueda );
                }
        });
      }
    });
  }

  nuevoHospital( ) {
    Swal.fire({
      title: 'Ingrese Nombre del Hospital:',
      input: 'text',
      inputAttributes: { autocapitalize: 'off'  },
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      inputValidator: (value) => {
          if (!value) {
              return 'Debe ingresar un nombre de Hospital!!!'
          }
      },
      showClass: {
        popup: 'animated fadeInDown faster'
      },
      hideClass: {
        popup: 'animated fadeOutUp faster'
      }

    }).then((result) => {
      if (!result.dismiss ) {
        this._hospitalService.crearHospital( result.value )
              .subscribe( (resp) => { 
                if (this.bandera) {
                  this.desde = 0;
                  this.cargarHospitales();
                } else {
                  this.buscarHospitales( this.terminoBusqueda );
                }
               } );
      }      
     });
  }
  
  verUsuario( hospital: any ) {
    Swal.fire({
      icon: 'info',
      html:
            `<ul class="list-group">
            <li class="list-group-item active">Datos del usuario que creo el Hospital.</li>
            <li class="list-group-item">Nombre: ${ hospital.usuario.nombre }</li>
            <li class="list-group-item">Correo: ${ hospital.usuario.email }</li>
           </ul>`,
    });
  }

  mostrarModal( id: string ) {
    this._modalUploadService.mostrarModal( 'hospitales', id );
  }
/////Fin Clase
}
