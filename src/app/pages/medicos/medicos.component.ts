import { Component, OnInit } from '@angular/core';

///  Servicios
import { MedicoService } from '../../services/service.index';

/// Modelos
import { Medico } from '../../models/medico.model';


/// Sweet Alert 2
import Swal from 'sweetalert2';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  terminoBusqueda: string = "";
  constructor(
              public _medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
    
  }

  cambiarDesde( valor: number ) { 
    this.totalRegistros = this._medicoService.totalMedicos;
    let desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      desde = 0;
      return;
    }
    this.desde += valor;
    this.cargarMedicos();

  }

  cargarMedicos() {
    this._medicoService.cargarMedicos( this.desde ).subscribe( ( medicos: Medico[] ) => this.medicos = medicos );
    
  }

  mostrarMedicos() {

  }


  buscarMedico( termino: string ) { 

    if( termino.length === 0 ) {
      this.cargarMedicos();
      return;
    }
    this._medicoService.buscarMedicos( termino ).subscribe( ( medicos: Medico[] ) => this.medicos = medicos );
  }

  borrarMedico( medico: Medico ) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: `Estas a punto de borrar información del Médico: ${ medico.nombre }`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this._medicoService.borrarMedico( medico._id )
               .subscribe((resp) => {
                   this.cargarMedicos();

         });
      }
    });
  }

//////Fin Clase
}
