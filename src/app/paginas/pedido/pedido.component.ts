import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../interfaces/pedidos-pagina.interface';
import { ActivatedRoute } from '@angular/router';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  pedido: Pedido;
  precioTotal = 0;
  constructor(private route: ActivatedRoute, public pedidosSv: PedidosService) {}

  ngOnInit() {
    this.route.params.subscribe( async (parametros) => {
      this.pedido = await this.pedidosSv.getPedido(parametros.id);
      for (const producto of this.pedido.productos) {
        this.precioTotal = this.precioTotal + producto.cantidad * producto.precio;
      }
    });
  }

}
