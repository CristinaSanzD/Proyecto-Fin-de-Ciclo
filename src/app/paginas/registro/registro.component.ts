import { Component, OnInit } from '@angular/core';
import { DataBdService } from '../../services/data-bd.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {
  enviado = false;
  private emailPattern: any = /^[A-Za-z0-9]{1,99}@[A-Za-z0-9.]{1,99}[.]{1}[A-Za-z]{2,3}/;
  private passPattern: any = /[A-Za-zÑñ]{8,99}[0-9]{1,99}/;
  contactForm: FormGroup;
  claveForm: FormGroup;
  clave = '';
  clValida = true;
  mailExistente = false;
  constructor(private bdData: DataBdService, public http: HttpClient, private router: Router, public userSv: UsersService) {
    window.scrollTo(500, 0);
    this.contactForm = this.createFormGroup();
    this.http.get('assets/JSON/clave.json').subscribe( (resp: any) => {
      this.clave = resp.clave;
      this.claveForm = this.createclaveForm();
    });
  }

  get apellidos() { return this.contactForm.get('apellidos'); }
  get email() { return this.contactForm.get('email'); }
  get nombre() { return this.contactForm.get('nombre'); }
  get password() { return this.contactForm.get('password'); }
  get rol() { return this.contactForm.get('rol'); }
  get usuario() { return this.contactForm.get('usuario'); }
  get claveF() { return this.claveForm.get('clave'); }

  createFormGroup() {
    return new FormGroup({
      apellidos: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      nombre: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(9), Validators.pattern(this.passPattern)]),
      rol: new FormControl('', [Validators.required]),
      usuario: new FormControl('', [Validators.required])
    });
  }
  createclaveForm() {
    return new FormGroup({
      clave: new FormControl('', [Validators.required, Validators.pattern(this.clave)])
    });
  }
  ngOnInit(): void {
  }
  onResetForm() {
    this.contactForm.reset();
  }
 async onSaveForm() {
    await this.comprobraEmail();
    if (this.contactForm.valid && !this.mailExistente) {
      if (this.rol.value === '1') {
        if (this.claveForm.valid) {
          this.guardarUsuario();
          this.clValida = true;
          this.router.navigate(['']);
        } else {
          this.clValida = false;
        }
      } else {
        this.guardarUsuario();
        this.router.navigate(['']);
      }
    } else {
      if (!this.mailExistente) {
        this.enviado = true;
      }
    }
  }
  async comprobraEmail() {
   this.mailExistente = false;
   const users = await this.bdData.getUsuariosPromise();
   for (const user of users) {
     if (user.email === this.email.value) {
        return this.mailExistente = true;
     }
   }
  }
  guardarUsuario() {
    this.bdData.addUser(this.contactForm.value);
    sessionStorage.setItem('usuario', JSON.stringify( this.contactForm.value ) );
    this.userSv.comprobarSesion();
    this.onResetForm();
  }

}
