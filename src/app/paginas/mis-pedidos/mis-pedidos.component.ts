import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../interfaces/pedidos-pagina.interface';
import { PedidosService } from '../../services/pedidos.service';
import { User } from '../../interfaces/usuarios-pagina.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css']
})
export class MisPedidosComponent implements OnInit {
  pedidos: Pedido[];
  email = '';
  usu: User;
  constructor(public pedidosSv: PedidosService, private router: Router) {
    if (localStorage.getItem('usuario')) {
      this.usu = JSON.parse(sessionStorage.getItem('usuario'));
    } else if (sessionStorage.getItem('usuario')) {
      this.usu = JSON.parse(sessionStorage.getItem('usuario'));
    } else {
      this.router.navigate(['']);
    }
    this.email = this.usu.email;
  }

   async ngOnInit() {
     this.pedidos = await this.pedidosSv.filtrarPedidos(this.email);
  }

}
