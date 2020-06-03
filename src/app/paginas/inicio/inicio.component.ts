import { Component, OnInit } from '@angular/core';
import { InfoPaginaService } from '../../services/info-pagina.service';
import { Producto } from '../../interfaces/productos-pagina.interface';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {
  destacados: Producto[];
  constructor(public info: InfoPaginaService) {
    window.scrollTo(500, 0);
    this.buscarDestacados();
   }
  async buscarDestacados() {
    this.destacados = await this.info.buscarDestacados();
  }
  ngOnInit(): void {
  }

}
