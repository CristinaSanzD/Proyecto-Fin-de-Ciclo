import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import {  Observable } from 'rxjs';
import { User } from '../interfaces/usuarios-pagina.interface';
import { Producto } from '../interfaces/productos-pagina.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataBdService {
  usuarios: User[] = [];
  productos: Producto[] = [];
  private filePath: any;
  downloadURL: '';
  private contactCollection: AngularFirestoreCollection<User>;
  private productosCollection: AngularFirestoreCollection<Producto>;
  constructor(private afs: AngularFirestore,
              private storage: AngularFireStorage ) {
    this.contactCollection = afs.collection<User>('usuarios');
    this.productosCollection = afs.collection<Producto>('productos');
  }
  addUser(newContact: User): void {
    this.contactCollection.add(newContact);
  }
  getUsers() {
    return this.afs.collection('usuarios').snapshotChanges()
      .subscribe( (resp: DocumentChangeAction<any>[]) => {
        const data = resp.map(r => {
          const user = r.payload.doc.data();
          user.id = r.payload.doc.id;
          return user;
        });
        this.usuarios = data;
      });
  }
  getProductos() {
    return this.afs.collection('productos').snapshotChanges()
      .subscribe((resp: DocumentChangeAction<any>[]) => {
        const data = resp.map(r => {
          const prod = r.payload.doc.data();
          prod.id = r.payload.doc.id;
          return prod;
        });
        this.productos = data;
      });
  }

  async getProductosPromise(): Promise<Producto[]> {
    if (this.productos && this.productos.length > 0) {
      return this.productos;
    }
    return new Promise((resolve, reject) => {
      return this.productosCollection.snapshotChanges()
        .subscribe((resp: DocumentChangeAction<any>[]) => {
        resolve(resp.map(r => {
          const prod = r.payload.doc.data();
          prod.id = r.payload.doc.id;
          return prod;
        }));
      });
    });
  }
  async getUsuariosPromise(): Promise<User[]> {
    if (this.usuarios && this.usuarios.length > 0) {
      return this.usuarios;
    }
    return new Promise((resolve, reject) => {
      return this.contactCollection.snapshotChanges()
        .subscribe((resp: DocumentChangeAction<any>[]) => {
        resolve(resp.map(r => {
          const usu = r.payload.doc.data();
          usu.id = r.payload.doc.id;
          return usu;
        }));
      });
    });
  }
  addProducto(newProducto: Producto): void {
    this.productosCollection.add(newProducto);
  }
  modificarProducto(id: string, producto: Producto) {
    this.afs.collection('productos').doc(id).set(producto);
  }
  guardarImagen(producto: Producto, image: File) {
    this.filePath = `${image.name}`;
    const fileRef =  this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(urlImage => {
          this.downloadURL = urlImage;
          console.log('URL_IMAGE', urlImage);
        });
      })
    ).subscribe();
  }
  onDelete(id) {
    this.afs.collection('productos').doc(id).delete();
  }

}
