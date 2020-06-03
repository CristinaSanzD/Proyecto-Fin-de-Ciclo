import { Component, OnInit } from '@angular/core';
import { InfoPaginaService } from '../../services/info-pagina.service';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../interfaces/productos-pagina.interface';
import { DataBdService } from '../../services/data-bd.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {
  productos: Producto[];
  constructor(public _infoService: InfoPaginaService, private route: ActivatedRoute,
              private databd: DataBdService, public userSv: UsersService) { 
                window.scrollTo(500, 0);
              }

  ngOnInit(): void {
    this.route.params.subscribe( async (parametros) => {
      switch (parametros.id) {
        case '0': this.productos = await this.databd.getProductosPromise();
                  console.log('0');
                  break;
        case '2': this.productos = await this._infoService.buscarProductosIntegral();
                  console.log('1');
                  break;
        case '1': this.productos = await this._infoService.buscarProductosSinGluten();
                  console.log('2');
                  break;
        default: console.log('ninguno');
      }
      
    });
  }

}
