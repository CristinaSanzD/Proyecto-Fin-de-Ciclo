import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './global/header/header.component';
import { FooterComponent } from './global/footer/footer.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { PersonalComponent } from './paginas/personal/personal.component';
import { ProductosComponent } from './paginas/productos/productos.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductoComponent } from './paginas/producto/producto.component';
import { BuscarComponent } from './paginas/buscar/buscar.component';
import { LoginComponent } from './paginas/login/login.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { environment } from '../environments/environment';
import { DataBdService } from './services/data-bd.service';
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { ModificarProdComponent } from './paginas/modificar-prod/modificar-prod.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AddProductoComponent } from './paginas/add-producto/add-producto.component';
import { AddStockComponent } from './paginas/add-stock/add-stock.component';
import { IngredientesComponent } from './paginas/ingredientes/ingredientes.component';
import { ModificarStockComponent } from './paginas/modificar-stock/modificar-stock.component';
import { AvisosComponent } from './global/avisos/avisos.component';
import { ContactoComponent } from './global/contacto/contacto.component';
import { TerminosComponent } from './global/terminos/terminos.component';
import { MapComponent } from './global/map/map.component';
import { CestaComponent } from './paginas/cesta/cesta.component';
import { PedirComponent } from './paginas/pedir/pedir.component';
import { PedidosComponent } from './paginas/pedidos/pedidos.component';
import { PedidoComponent } from './paginas/pedido/pedido.component';
import { MisPedidosComponent } from './paginas/mis-pedidos/mis-pedidos.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    PersonalComponent,
    ProductosComponent,
    ProductoComponent,
    BuscarComponent,
    LoginComponent,
    RegistroComponent,
    ModificarProdComponent,
    AddProductoComponent,
    AddStockComponent,
    IngredientesComponent,
    ModificarStockComponent,
    AvisosComponent,
    ContactoComponent,
    TerminosComponent,
    MapComponent,
    CestaComponent,
    PedirComponent,
    PedidosComponent,
    PedidoComponent,
    MisPedidosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    AngularFireStorageModule
  ],
  providers: [DataBdService, { provide: LocationStrategy, useClass: HashLocationStrategy}, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
