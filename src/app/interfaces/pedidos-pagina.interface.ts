import { Producto } from './productos-pagina.interface';
export interface Pedido {
    id?: string;
    nombre?: string;
    apellidos?: string;
    productos?: Producto[];
    fecha?: string;
    email?: string;
}
