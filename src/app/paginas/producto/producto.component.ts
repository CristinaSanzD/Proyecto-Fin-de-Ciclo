import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoPaginaService } from '../../services/info-pagina.service';
import { Producto, Ingrediente } from '../../interfaces/productos-pagina.interface';
import { DataBdService } from '../../services/data-bd.service';
import { StockService } from '../../services/stock.service';
import { UsersService } from '../../services/users.service';
import { CestaService } from '../../services/cesta.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html'
})
export class ProductoComponent implements OnInit {
  producto: Producto;
  stockDisponible: Ingrediente[];
  hayIngrediente = false;
  posibleHacer = true;
  restado = false;
  conectado = true;
  noCantidad = false;
  formPan: FormGroup;
  constructor(private route: ActivatedRoute,
              public productoService: InfoPaginaService,
              public dataBd: DataBdService,
              public stockService: StockService, public router: Router,
              public userSv: UsersService, public cestaSv: CestaService) {
                window.scrollTo(500, 0);
                this.formPan = this.createFormGroup();
                 }

  ngOnInit() {
    this.route.params.subscribe( async (parametros) => {
      this.producto = await this.productoService.getProducto(parametros.id);
    });
  }
  createFormGroup() {
    return new FormGroup({
      cantidad: new FormControl('', [Validators.required])
    });
  }
  get cantidad() { return this.formPan.get('cantidad'); }
  DeleteProd() {
    this.dataBd.onDelete(this.producto.id);
  }
  async comprobarStock() {
    if (this.cantidad.valid) {
      this.noCantidad = false;
      this.posibleHacer = true;
      this.stockDisponible = await this.stockService.getIngredientesPromise();
      for (const ingrediente of this.producto.ingredientes) {
        this.hayIngrediente = false;
        for (const ing of this.stockDisponible) {
          if (ingrediente.ingrediente.toUpperCase() === ing.ingrediente.toUpperCase() &&
          ing.unidad.toUpperCase() === ingrediente.unidad.toUpperCase() ) {
            this.hayIngrediente = true;
            if (ing.cantidad < ingrediente.cantidad * this.cantidad.value) {
            this.posibleHacer = false;
            }
          }
        }
        if (!this.hayIngrediente) {
          this.posibleHacer = false;
        }
      }
      if (this.posibleHacer) {
        this.restarStock();
      }
    } else {
      this.noCantidad = true;
    }
  }
  restarStock() {
    for (const ingrediente of this.producto.ingredientes) {
      for (const ing of this.stockDisponible) {
        if (ingrediente.ingrediente.toUpperCase() === ing.ingrediente.toUpperCase() &&
         ing.unidad.toUpperCase() === ingrediente.unidad.toUpperCase() ) {
          ing.cantidad = ing.cantidad - ingrediente.cantidad;
          this.stockService.modificarStock(ing.id, ing);
          this.restado = true;
        }
      }
    }
  }
  addCarrito(producto: Producto) {
    if (this.userSv.rol === '0' || this.userSv.rol === '1' || this.userSv.rol === '2') {
      this.cestaSv.addCesta(producto);
      this.router.navigate(['/cesta']);
    } else {
      this.conectado = false;
    }
  }

}
