import { Component, OnInit } from '@angular/core';
import { InfoPaginaService } from '../../services/info-pagina.service';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { storage } from 'firebase';
import { CestaService } from '../../services/cesta.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor( public servicio: InfoPaginaService, public userSv: UsersService,
               private router: Router, private cestaSv: CestaService) {
   }

  ngOnInit() {
  }

  buscarProducto( prod: string) {
    if ( prod.length < 1 ) {
      return;
    }
    this.router.navigate(['/buscar', prod]);
  }
  cerrarSesion() {
    if (sessionStorage.getItem("usuario")) {
      sessionStorage.clear();
    }
    localStorage.clear();
    this.cestaSv.productos = [];
    this.userSv.comprobarSesion();
    this.router.navigate(['']);
  }
}
