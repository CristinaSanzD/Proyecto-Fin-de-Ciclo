import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  logInForm: FormGroup;
  usuarioValido = true; 
  constructor( public _usuarios: UsersService,  private router: Router, public http: HttpClient) {
    window.scrollTo(500, 0);
    this.logInForm = this.createFormGroup();
  }
  createFormGroup() {
    return new FormGroup({
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      mantener: new FormControl('')
    });
  }
  get email() { return this.logInForm.get('email'); }
  get password() { return this.logInForm.get('password'); }
  get mantener() { return this.logInForm.get('mantener'); }
  ngOnInit(): void {
  }
 async onSaveForm() {
    if (await this._usuarios.comprobarUsuario(this.email.value, this.password.value, this.mantener.value) == true) {
      this.usuarioValido = true;
      this.router.navigate(['']);
    } else {
      this.usuarioValido = false;
    }
  }

}
