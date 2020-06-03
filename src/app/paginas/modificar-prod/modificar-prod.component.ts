import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DataBdService } from '../../services/data-bd.service';
import { Producto } from '../../interfaces/productos-pagina.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoPaginaService } from '../../services/info-pagina.service';
import { UsersService } from '../../services/users.service';
@Component({
  selector: 'app-modificar-prod',
  templateUrl: './modificar-prod.component.html'
})
export class ModificarProdComponent implements OnInit {
  private image: any;
  producto: Producto;
  productoMod: Producto;
  productForm: FormGroup;
  constructor(private bdData: DataBdService, private route: ActivatedRoute,
              public productoService: InfoPaginaService, private router: Router, public userSv: UsersService) {
    if (this.userSv.rol !== '1' && this.userSv.rol !== '2') {
      this.router.navigate(['']);
    }
    window.scrollTo(500, 0);
    this.route.params.subscribe( async (parametros) => {
      this.producto = await this.productoService.getProducto(parametros.id);
      this.createIngredientes(this.producto.ingredientes.length);
      this.inicializar();
    });
    this.productForm = this.createFormGroup();
  }
  createFormGroup() {
    return new FormGroup({
      imagen: new FormControl(''),
      nombre: new FormControl(''),
      precio: new FormControl(''),
      pan: new FormControl(''),
      gluten: new FormControl(''),
      ingredientes: new FormArray([
        new FormGroup({
          ingrediente: new FormControl(''),
          cantidad: new FormControl(''),
          unidad: new FormControl('')
        })
      ])
    });
  }
  createIngredientes(num: number){
    for (let index = 0; index < num - 1; index++) {
      this.addIngrediente();


    }
  }
  ngOnInit() {

  }
  private inicializar(): void{
    this.productForm.patchValue({
      nombre: this.producto.nombre,
      precio: this.producto.precio,
      pan: this.producto.pan,
      gluten: this.producto.gluten,
      ingredientes: this.producto.ingredientes

    });
  }
  onResetForm() {
    this.productForm.reset();
  }
  onSaveForm() {
   this.productoMod = this.productForm.value;
   if (this.bdData.downloadURL) {
      this.productoMod.imagen = this.bdData.downloadURL;
      this.bdData.downloadURL = '';

   } else {
     this.productoMod.imagen = this.producto.imagen;
   }
   this.bdData.modificarProducto(this.producto.id, this.productoMod);
   this.router.navigate(['/productos']);
  }
  get ingredientes(){
    return this.productForm.get('ingredientes') as FormArray;
  }
  addIngrediente() {
    this.ingredientes.push(new FormGroup({
      ingrediente: new FormControl(''),
      cantidad: new FormControl(''),
      unidad: new FormControl('')
    }));
  }
  deleteIngrediente(index: number) {
    if (this.ingredientes.length !== 1) {
      this.ingredientes.removeAt(index);
    }
  }
  guardarImagen(event: any): void {
    this.image = event.target.files[0];
    this.bdData.guardarImagen(this.producto, this.image);
  }
}
