import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/productos-pagina.interface';
import { stringify } from 'querystring';
import { DataBdService } from './data-bd.service';

@Injectable({
  providedIn: 'root'
})

export class InfoPaginaService {
  filtroProd: Producto[] = [];
  producto: Producto;
  guardar = true;


  constructor(public dataBd: DataBdService) {
    this.dataBd.getProductos();

   }



  async getProducto(id: string): Promise<Producto> {
    const productos = await this.dataBd.getProductosPromise();
    for (const producto of productos) {
      if (producto.id === id) {
        this.producto = producto;
        return producto;
      }
    }
  }

   async buscarProducto(prod: string) {
     this.filtroProd = [];
     const productos = await this.dataBd.getProductosPromise();

     productos.forEach( produc => {
       if ( produc.nombre.toUpperCase().indexOf( prod.toUpperCase() ) >= 0 ) {
         this.filtroProd.push( produc );
       } else {
         this.guardar = true;
         produc.ingredientes.forEach(ingrediente => {
           if (ingrediente.ingrediente.toUpperCase().indexOf(prod.toUpperCase()) >= 0 && this.guardar){
             this.guardar = false;
             this.filtroProd.push( produc );
           }

         });
       }
     });
   }
   async buscarProductosIntegral(): Promise<Producto []> {
    this.filtroProd = [];
    const productos = await this.dataBd.getProductosPromise();

    productos.forEach( produc => {
      if ( produc.pan === '1' ) {
        this.filtroProd.push( produc );
      }
    });
    return this.filtroProd;
  }
  async buscarProductosSinGluten(): Promise<Producto []> {
    this.filtroProd = [];
    const productos = await this.dataBd.getProductosPromise();

    productos.forEach( produc => {
      if ( produc.gluten === '1' ) {
        this.filtroProd.push( produc );
      }
    });
    return this.filtroProd;
  }
  async buscarDestacados(): Promise<Producto []> {
    this.filtroProd = [];
    const productos = await this.dataBd.getProductosPromise();
    productos.forEach( produc => {
      if ( produc.destacado ) {
        this.filtroProd.push( produc );
      }
    });
    return this.filtroProd;
  }
}
