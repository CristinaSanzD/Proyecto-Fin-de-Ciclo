import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html'
})
export class IngredientesComponent implements OnInit {

  constructor(public _stock: StockService, public userSv: UsersService, public router: Router) {
    if (this.userSv.rol !== '2') {
      this.router.navigate(['']);
    }
    window.scrollTo(500, 0);
    _stock.getIngredientes();
  }
  borrar(id: string){
    this._stock.borrarStock(id);
  }
  ngOnInit(): void {
  }

}
