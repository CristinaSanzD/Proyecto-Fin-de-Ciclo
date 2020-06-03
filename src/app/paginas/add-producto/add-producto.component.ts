import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DataBdService } from '../../services/data-bd.service';
import { Producto } from '../../interfaces/productos-pagina.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoPaginaService } from '../../services/info-pagina.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html'
})
export class AddProductoComponent implements OnInit {

  private image: any;
  producto: Producto;
  productForm: FormGroup;
  constructor(private bdData: DataBdService, private route: ActivatedRoute,
              public productoService: InfoPaginaService,  private router: Router, private userSv: UsersService ) {
      if (this.userSv.rol !== '1' && this.userSv.rol !== '2') {
        this.router.navigate(['']);
      }
      window.scrollTo(500, 0);
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
  ngOnInit() {
    this.productForm = this.createFormGroup();

  }

  onResetForm() {
    this.productForm.reset();
  }
  onSaveForm() {
   this.producto = this.productForm.value;
   if (this.bdData.downloadURL) {
      this.producto.imagen = this.bdData.downloadURL;
      this.bdData.downloadURL = '';
   }
   this.bdData.addProducto(this.producto);
   this.router.navigate(['/productos']);

  }
  get ingredientes() {
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
