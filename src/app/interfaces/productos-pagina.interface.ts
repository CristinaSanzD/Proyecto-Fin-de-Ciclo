export interface Producto {
  id?: string;
  imagen?: string;
  ingredientes?: Ingrediente[];
  nombre?: string;
  precio?: number;
  pan?: string;
  gluten?: string;
  destacado?: boolean;
  cantidad?: number;
}

export interface Ingrediente {
  id?: string;
  cantidad?: number ;
  ingrediente?: string;
  unidad?: string;
}
