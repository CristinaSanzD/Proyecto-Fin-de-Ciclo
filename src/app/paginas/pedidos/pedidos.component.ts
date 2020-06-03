import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';
import { Pedido } from 'src/app/interfaces/pedidos-pagina.interface';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  pedidos: Pedido[];
  constructor(public pedidosSv: PedidosService, public userSv: UsersService, private router: Router) {
    if (this.userSv.rol !== '2') {
      this.router.navigate(['']);
    }
  }

   async ngOnInit() {
     this.pedidos = await this.pedidosSv.getPedidosPromise();
  }

}
