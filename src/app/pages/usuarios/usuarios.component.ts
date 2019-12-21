import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';


// servicios
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  
  usuarios: Usuario[] = [];
  usuariosBusqueda: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  bandera: boolean = true;
  terminoBusqueda: string = "";
  constructor(
              public _usuarioService: UsuarioService,
              public _modalUploadService: ModalUploadService,
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe((resp) => { 
        // this.desde = 0;
        // this.cargarUsuarios();
            if (this.bandera) {
              this.desde = 0;
              this.cargarUsuarios();
            } else {
              this.buscarUsuario( this.terminoBusqueda );
            }
    });
  }

  cargarUsuarios(){
    this.cargando = true;
    this._usuarioService.getUsuarios(this.desde)
            .subscribe((resp: any) => { 
              this.totalRegistros = resp.total;
              this.usuarios = resp.usuarios;
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
      this.cargarUsuarios();
    } else {
      this.desde += valor;
      this. mostrarBusqueda();
    }
  }

  buscarUsuario( termino: string ){
    this.terminoBusqueda = termino;
    //console.log( termino );
    if( termino.length === 0 ) {
      this.cargarUsuarios();
      this.bandera = true;
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuarios( termino ).subscribe( ( usuarios: Usuario[] ) => { 
            //console.log( usuarios );
            this.totalRegistros = usuarios.length;
            this.usuariosBusqueda = usuarios;
            this.cargando = false;
            this.bandera =  false;
            this.desde = 0;
            this.mostrarBusqueda();
    });
  }
  
  mostrarBusqueda(){
    let arrayUserTemp: Usuario[] = [];
    for (let index = this.desde; index < this.desde + 5; index++) {
      if (index < this.totalRegistros) {
        arrayUserTemp.push(this.usuariosBusqueda[index]);
      }else{
        break;
      }
    }
    this.usuarios = arrayUserTemp;
  }  

  borrarUsuario( usuario: Usuario ){

    if (usuario._id === this._usuarioService.usuario._id) {
      Swal.fire('No se puede borrar', 'Está intentando borrarse a si mismo.', 'error');
      return;
    }
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: `Esta a punto de borrar información del usuario: ${ usuario.nombre }`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this._usuarioService.borrarUsuario( usuario._id )
            .subscribe((resp) => {  
              if (this.bandera) {
                this.desde = 0;
                this.cargarUsuarios();
              } else {
                this.buscarUsuario( this.terminoBusqueda );
              }
        });
      }
    });
  }
   
  guardarUsuario( usuario: Usuario ) {
    this._usuarioService.actualizarUsuario( usuario )
    .subscribe((resp) => { 
        if (this.bandera) {
          this.desde = 0;
          this.cargarUsuarios();
        } else {
          this.buscarUsuario( this.terminoBusqueda );
        }
     });
  }

  mostrarModal( id: string ) {
    this._modalUploadService.mostrarModal( 'usuarios', id );
  }





/////////Fin Clase
}
