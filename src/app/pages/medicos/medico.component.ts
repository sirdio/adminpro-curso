import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// Servicios
import { HospitalService, MedicoService } from '../../services/service.index';

//modelo
import { Hospital } from '../../models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico( '', '', '', '', '' );
  hospital: Hospital = new Hospital( '' );
  ruta: string = '';
  constructor(
              public _medicoService: MedicoService,
              public _hospitalService: HospitalService,
              public _modalUpLoadService: ModalUploadService,
              public router: Router,
              public acitavatedRouter: ActivatedRoute
  ) { 
    acitavatedRouter.params.subscribe( params =>{
      let id = params['id'];
      this.ruta = id;
      if (id !== 'nuevo') {
        this.obtenerMedico( id );
      }
    });
  }

  ngOnInit() {
    this._hospitalService.todosHospitales().subscribe( ( hospitales ) => this.hospitales = hospitales );
    this._modalUpLoadService.notificacion.subscribe((resp) => { 
        this.medico.img = resp.medico.img;
    });
  }

  obtenerMedico( id: string ) {
    this._medicoService.obtenerMedico( id ).subscribe( medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital( this.medico.hospital );
    } );
  }

  guardarMedico( forma: NgForm ) {
    if (forma.invalid) {
      return;
    }
    this._medicoService.guardarMedico( this.medico ).subscribe( ( medico ) => {
       this.medico._id = medico._id;
       this.router.navigate(['/medico', medico._id]);
    } );
  }

  cambioHospital( id: string ) {
    if ( id === '' ) {
      this.hospital.img = '';
      return;
    }
    this._hospitalService.obtenerHospital( id ).subscribe(( hospital ) => this.hospital = hospital);
   }

   cambiarFoto( ) {
      this._modalUpLoadService.mostrarModal( 'medicos', this.medico._id);
   }

}
