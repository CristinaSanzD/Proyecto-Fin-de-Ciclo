import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/productos-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class CestaService {
productos: Producto[] = [];
index;
  constructor() {
    if (localStorage.getItem("productos")) {
      this.productos = JSON.parse(localStorage.getItem("productos"));
    } else if (sessionStorage.getItem("productos")) {
      this.productos = JSON.parse(sessionStorage.getItem("productos"));
    }
  }
  addCesta(prod: Producto) {
      prod.cantidad = 1;
      this.productos.push(prod);
      if (localStorage.getItem("usuario")) {
        localStorage.setItem("productos", JSON.stringify(this.productos));
      } else {
        sessionStorage.setItem("productos", JSON.stringify(this.productos));
      }
  }
  eliminarCesta(id: string) {
    let i = 0;
    for (const producto of this.productos) {
      if (producto.id === id) {
        this.index = i;
      }
      i++;
    }
    this.productos.splice(this.index, 1 );
    if (localStorage.getItem("usuario")) {
      localStorage.setItem("productos", JSON.stringify(this.productos));
    } else {
      sessionStorage.setItem("productos", JSON.stringify(this.productos));
    }
    this.index = null;
  }
  precioTotal() {
    let precio = 0;
    for (const producto of this.productos) {
      precio = precio + producto.precio * producto.cantidad;
    }
    return precio;
  }
}
