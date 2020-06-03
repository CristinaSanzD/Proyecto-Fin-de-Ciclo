import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CestaService } from '../../services/cesta.service';
import { Router } from '@angular/router';
import { PdfMakeWrapper, Columns } from 'pdfmake-wrapper';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Producto } from '../../interfaces/productos-pagina.interface';
import { PedidosService } from '../../services/pedidos.service';
import { Pedido } from 'src/app/interfaces/pedidos-pagina.interface';
import { User } from '../../interfaces/usuarios-pagina.interface';

@Component({
  selector: 'app-pedir',
  templateUrl: './pedir.component.html'
})
export class PedirComponent implements OnInit {
  datos: FormGroup;
  fechaFormateada;
  pedidoEnviado = false;
  datosEnviados = false;
  usuario: User;
  constructor(private miDatePipe: DatePipe, public cestaSv: CestaService,
              private router: Router, public pedidoSv: PedidosService) {
    if (cestaSv.productos.length === 0) {
      this.router.navigate(['']);
    }
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else if (sessionStorage.getItem('usuario')) {
      this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
    }
    window.scrollTo(500, 0);
    this.datos = this.createFormGroup();
    this.fechaFormateada = this.miDatePipe.transform(new Date(), 'yyyy-MM-dd');
    console.log(this.fechaFormateada);
  }
  private nomPattern: any = /^[A-Za-zÑñáéíóúÁÉÍÓÚÜü ]{1,99}$/;
  get fecha() { return this.datos.get('fecha'); }
  get nombre() { return this.datos.get('nombre'); }
  get apellidos() { return this.datos.get('apellidos'); }
  ngOnInit(): void {
  }
  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.pattern(this.nomPattern)]),
      apellidos: new FormControl('', [Validators.required,  Validators.pattern(this.nomPattern)]),
      fecha: new FormControl('', [Validators.required])
    });
  }
  onSubmit() {
    if ( this.datos.valid) {
      this.pedidoEnviado = true;
      this.guardarPedido();
      this.generarPdf();
      if (localStorage.getItem('productos')) {
        localStorage.removeItem('productos');
      } else {
        sessionStorage.removeItem('productos');
      }
      this.cestaSv.productos = [];
    } else {
      this.datosEnviados = true;
    }
  }
  generarPdf() {
    let precioTotal = 0;
    PdfMakeWrapper.setFonts(pdfFonts);
    const pdf = new PdfMakeWrapper();
    pdf.pageSize('A4');
    pdf.add('Pedido');
    pdf.add('persona encargada de recoger el pedido:');
    pdf.add(new Columns([ this.nombre.value + ' ' +  this.apellidos.value ]).end );
    pdf.add(' ');
    pdf.add('fecha de recogida: ' + this.fecha.value);
    pdf.add(' ');
    pdf.add(new Columns([ 'producto' , 'cantidad' , 'precio por unidad',  'precio']).end );
    this.cestaSv.productos.forEach((producto: Producto) => {
      pdf.add(new Columns([ producto.nombre , producto.cantidad, producto.precio + '€',
       Math.round(producto.precio * producto.cantidad * 100) / 100 + '€' ]).end );
      precioTotal = precioTotal + producto.precio * producto.cantidad;
    });
    pdf.add(' ');
    pdf.add('precio total a abonar: ' + Math.round(precioTotal * 100) / 100 + '€');
    // pdf.create().download();
    pdf.create().open();
  }
  guardarPedido() {
    const pedido = {
      nombre: this.nombre.value,
      apellidos: this.apellidos.value,
      fecha: this.fecha.value,
      productos: this.cestaSv.productos,
      email: this.usuario.email
    };
    this.pedidoSv.addPedido(pedido);
  }
}
