import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { PersonalComponent } from './paginas/personal/personal.component';
import { ProductosComponent } from './paginas/productos/productos.component';
import { ProductoComponent } from './paginas/producto/producto.component';
import { BuscarComponent } from './paginas/buscar/buscar.component';
import { LoginComponent } from './paginas/login/login.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { ModificarProdComponent } from './paginas/modificar-prod/modificar-prod.component';
import { AddProductoComponent } from './paginas/add-producto/add-producto.component';
import { AddStockComponent } from './paginas/add-stock/add-stock.component';
import { IngredientesComponent } from './paginas/ingredientes/ingredientes.component';
import { ModificarStockComponent } from './paginas/modificar-stock/modificar-stock.component';
import { TerminosComponent } from './global/terminos/terminos.component';
import { AvisosComponent } from './global/avisos/avisos.component';
import { ContactoComponent } from './global/contacto/contacto.component';
import { CestaService } from './services/cesta.service';
import { CestaComponent } from './paginas/cesta/cesta.component';
import { PedirComponent } from './paginas/pedir/pedir.component';
import { PedidosComponent } from './paginas/pedidos/pedidos.component';
import { PedidoComponent } from './paginas/pedido/pedido.component';
import { MisPedidosComponent } from './paginas/mis-pedidos/mis-pedidos.component';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'personal', component: PersonalComponent },
  { path: 'productos/:id', component: ProductosComponent },
  { path: 'producto/:id', component: ProductoComponent },
  { path: 'buscar/:prod', component: BuscarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'modificarProd/:id', component: ModificarProdComponent },
  { path: 'addProd', component: AddProductoComponent },
  { path: 'addStock', component: AddStockComponent },
  { path: 'ingredientes', component: IngredientesComponent },
  { path: 'modificarStock/:id', component: ModificarStockComponent },
  { path: 'terminos', component: TerminosComponent },
  { path: 'avisos', component: AvisosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'cesta', component: CestaComponent },
  { path: 'pedir', component: PedirComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'MisPedidos', component: MisPedidosComponent },
  { path: 'pedido/:id', component: PedidoComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
