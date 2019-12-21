import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


// servicios
import { UsuarioService } from 'src/app/services/service.index';

// modelo
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;
  constructor(
              public _usuarioService: UsuarioService,
              public router: Router
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

  buscar( termino: string ) {
    this.router.navigate(['/busqueda', termino]);
  }

}
