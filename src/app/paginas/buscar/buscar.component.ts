import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoPaginaService } from '../../services/info-pagina.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html'
})
export class BuscarComponent implements OnInit {

  constructor( private route: ActivatedRoute,
               public infoPaginaService: InfoPaginaService) { 
                window.scrollTo(500, 0);
               }

  ngOnInit() {

      this.route.params
        .subscribe(params => {
          console.log(params['prod']);
          this.infoPaginaService.buscarProducto(params['prod']);
        });
  }

}
