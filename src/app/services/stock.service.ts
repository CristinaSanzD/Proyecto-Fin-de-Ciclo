import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Ingrediente } from '../interfaces/productos-pagina.interface';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  ingredientes: Ingrediente[] = [];
  ingrediente: Ingrediente;
  private stockCollection: AngularFirestoreCollection<Ingrediente>;
  constructor(private afs: AngularFirestore,
              private storage: AngularFireStorage ) {
    this.stockCollection = afs.collection<Ingrediente>('stock');
  }
  addStock(newStock: Ingrediente): void{
    this.stockCollection.add(newStock);
  }
  borrarStock(id){
    this.stockCollection.doc(id).delete();
  }
  modificarStock(id: string, ing: Ingrediente){
    this.stockCollection.doc(id).set(ing);
  }
  getIngredientes() {
    return this.afs.collection('stock').snapshotChanges()
      .subscribe((resp: DocumentChangeAction<any>[]) => {
        console.log('res', resp);
        const data = resp.map(r => {
          const ingre = r.payload.doc.data();
          ingre.id = r.payload.doc.id;
          return ingre;
        });
        console.log('stock', data);
        this.ingredientes = data;
      });
  }
  async getIngredientesPromise(): Promise<Ingrediente[]> {
    if (this.ingredientes && this.ingredientes.length > 0) {
      return this.ingredientes;
    }
    return new Promise((resolve, reject) => {
      return this.stockCollection.snapshotChanges()
        .subscribe((resp: DocumentChangeAction<any>[]) => {
        resolve(resp.map(r => {
          const ingre = r.payload.doc.data();
          ingre.id = r.payload.doc.id;
          return ingre;
        }));
      });
    });
  }
  async getIngrediente(id: string): Promise<Ingrediente> {
    const ingredientes = await this.getIngredientesPromise();
    for (const ingrediente of ingredientes) {
      if (ingrediente.id === id) {
        this.ingrediente = ingrediente;
        return ingrediente;
      }
    }
  }
}
