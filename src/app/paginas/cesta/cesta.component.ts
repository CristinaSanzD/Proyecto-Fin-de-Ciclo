import { Component, OnInit } from '@angular/core';
import { CestaService } from '../../services/cesta.service';
import { Producto } from '../../interfaces/productos-pagina.interface';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html'
})
export class CestaComponent implements OnInit {

  constructor(public cestaSv: CestaService) {
    window.scrollTo(500, 0);
   }

  ngOnInit(): void {
  }
 sumar( prod: Producto ) {
    prod.cantidad ++;
    if (localStorage.getItem('usuario')) {
      localStorage.setItem("productos", JSON.stringify(this.cestaSv.productos));
    }else{
      sessionStorage.setItem("productos", JSON.stringify(this.cestaSv.productos));
    }
  }
 restar( prod: Producto) {
   if (prod.cantidad > 1) {
     prod.cantidad --;
     if (localStorage.getItem('usuario')) {
      localStorage.setItem("productos", JSON.stringify(this.cestaSv.productos));
    }else{
      sessionStorage.setItem("productos", JSON.stringify(this.cestaSv.productos));
    }
   }
 }
}
