import { Injectable } from '@angular/core';
import { Pedido } from '../interfaces/pedidos-pagina.interface';
import { AngularFirestoreCollection, AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private PedidosCollection: AngularFirestoreCollection<Pedido>;
  pedidos: Pedido[];
  pedidosFiltr: Pedido[];
  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.PedidosCollection = afs.collection<Pedido>('pedidos');
  }
  addPedido(newPedido: Pedido): void {
    this.PedidosCollection.add(newPedido);
  }
  getPedidos() {
    return this.afs.collection('pedidos').snapshotChanges()
      .subscribe((resp: DocumentChangeAction<any>[]) => {
        const data = resp.map(r => {
          const ped = r.payload.doc.data();
          ped.id = r.payload.doc.id;
          return ped;
        });
        this.pedidos = data;
      });
  }
  async getPedidosPromise(): Promise<Pedido[]> {
    if (this.pedidos && this.pedidos.length > 0) {
      return this.pedidos;
    }
    return new Promise((resolve, reject) => {
      return this.PedidosCollection.snapshotChanges()
        .subscribe((resp: DocumentChangeAction<any>[]) => {
        resolve(resp.map(r => {
          const pedido = r.payload.doc.data();
          pedido.id = r.payload.doc.id;
          return pedido;
        }));
      });
    });
  }
  async getPedido(id: string): Promise<Pedido> {
    const pedidos = await this.getPedidosPromise();
    for (const pedido of pedidos) {
      if (pedido.id === id) {
        return pedido;
      }
    }
  }
  async filtrarPedidos(email: string): Promise<Pedido []> {
    this.pedidosFiltr = [];
    const pedidos = await this.getPedidosPromise();

    pedidos.forEach( pedido => {
      if ( pedido.email ===  email) {
        this.pedidosFiltr.push( pedido );
      }
    });
    return this.pedidosFiltr;
  }
}
