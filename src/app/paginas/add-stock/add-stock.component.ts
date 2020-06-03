import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingrediente } from '../../interfaces/productos-pagina.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html'
})
export class AddStockComponent implements OnInit {
  intentado = false;
  stockForm: FormGroup;
  constructor(private stockSv: StockService, private router: Router, public userSv: UsersService) {
    if (this.userSv.rol !== '2') {
      this.router.navigate(['']);
    }
    window.scrollTo(500, 0);
    this.stockForm = this.createFormGroup();
  }
  get ingrediente() { return this.stockForm.get('ingrediente'); }
  get cantidad() { return this.stockForm.get('cantidad'); }
  get unidad() { return this.stockForm.get('unidad'); }
  createFormGroup() {
    return new FormGroup({
      ingrediente: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required]),
      unidad: new FormControl('', [Validators.required])
    });
  }
  ngOnInit(): void {
  }
  onSubmit() {
    if (this.stockForm.valid) {
      this.stockSv.addStock(this.stockForm.value);
      this.intentado = false;
      this.router.navigate(['/ingredientes']);
    } else {
      this.intentado = true;
    }
  }

}
