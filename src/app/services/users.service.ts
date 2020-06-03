import { Injectable } from '@angular/core';
import { DataBdService } from './data-bd.service';
import { User } from '../interfaces/usuarios-pagina.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usuarios: User[] = [];
  haySesion = false;
  rol = '';
  usu: User;

  constructor(private bdData: DataBdService, public http: HttpClient) {
    this.usuarios = this.bdData.usuarios;
    this.comprobarSesion();

   }
   async comprobarUsuario(email: string, password: string, mantener: boolean): Promise<boolean> {
    const usuarios = await this.bdData.getUsuariosPromise();
    let correcto = false;
    usuarios.forEach( usu => {
       if ( usu.email === email && usu.password === password ) {
         correcto = true;
         if (mantener) {
          localStorage.setItem("usuario", JSON.stringify( usu ) );
        } else {
          sessionStorage.setItem("usuario", JSON.stringify( usu ) );
        }
        this.comprobarSesion();
       }
     });
    return correcto;
  }
  comprobarSesion() {
    if (localStorage.getItem("usuario") || sessionStorage.getItem("usuario")) {
      this.haySesion = true;
    } else {
      this.haySesion = false;
    }
    this.comprobarRol();
  }
  comprobarRol() {
    if (this.haySesion) {
      if (localStorage.getItem("usuario")) {
        this.usu = JSON.parse(localStorage.getItem("usuario"));
      } else {
        this.usu = JSON.parse(sessionStorage.getItem("usuario"));
      }
      this.rol = this.usu.rol;
    } else {
      this.rol = '';
    }
    console.log(this.rol);
  }
}

