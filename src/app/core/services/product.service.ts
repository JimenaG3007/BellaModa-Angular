import { Injectable, signal, computed, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Product } from '../../models/product.model';

/**
 * Servicio de productos.
 * Obtiene los productos desde Supabase y los cachea con Signals.
 */
@Injectable({ providedIn: 'root' })
export class ProductService {
  private supabase = inject(SupabaseService);

  /** Lista de productos cacheada */
  private _products = signal<Product[]>([]);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  /** Signals públicas de solo lectura */
  readonly products = this._products.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  /** Total de productos */
  readonly totalProducts = computed(() => this._products().length);

  /** Productos filtrados por categoría */
  productsByCategory(category: string) {
    return computed(() =>
      category === 'all'
        ? this._products()
        : this._products().filter(p => p.categoria === category)
    );
  }

  /** Cargar productos desde Supabase */
  async loadProducts(): Promise<void> {
    this._loading.set(true);
    this._error.set(null);

    const { data, error } = await this.supabase.client
      .from('productos')
      .select('*')
      .order('nombre');

    if (error) {
      this._error.set(error.message);
      console.error('Error cargando productos:', error);
      // Si falla Supabase, cargar datos locales de respaldo
      this._products.set(this.getLocalProducts());
    } else {
      this._products.set(data as Product[]);
    }

    this._loading.set(false);
  }

  /** Agregar un nuevo producto a Supabase */
  async addProduct(product: Product): Promise<{ success: boolean; error?: string }> {
    this._loading.set(true);
    
    const { data, error } = await this.supabase.client
      .from('productos')
      .insert([product])
      .select()
      .single();

    this._loading.set(false);

    if (error) {
      console.error('Error insertando producto:', error);
      return { success: false, error: error.message };
    }

    // Actualizamos la señal local para que la UI reaccione inmediatamente
    const newProduct = data as Product;
    this._products.update(products => [...products, newProduct].sort((a, b) => a.nombre.localeCompare(b.nombre)));
    
    return { success: true };
  }

  /** Datos locales de respaldo (los 10 productos originales) */
  private getLocalProducts(): Product[] {
    return [
      { id: 'abrigobeige', nombre: 'Abrigo Beige Élite', imagen: 'img/AbrigoBeigeN.jpg', precio: 189, categoria: 'abrigo' },
      { id: 'abrigogris', nombre: 'Chaqueta Gris Oversize', imagen: 'img/AbrigoGrisMetalico.jpg', precio: 215, categoria: 'chaqueta' },
      { id: 'abrigoverde', nombre: 'Abrigo Jade Tenue', imagen: 'img/AbrigoVerdePalido.jpg', precio: 195, categoria: 'abrigo' },
      { id: 'chaquetaazul', nombre: 'Chaqueta Índigo y Marfil', imagen: 'img/ChaquetaAzulBeige.jpg', precio: 175, categoria: 'chaqueta' },
      { id: 'conjuntoblanco', nombre: 'Conjunto Perla y Denim', imagen: 'img/ConjuntoBlancoDenim.jpg', precio: 160, categoria: 'conjunto' },
      { id: 'conjuntorojo', nombre: 'Conjunto Vino y Sombras', imagen: 'img/ConjuntoRojoN.jpg', precio: 145, categoria: 'conjunto' },
      { id: 'conjuntorosa', nombre: 'Conjunto Dulce Ensueño', imagen: 'img/ConjuntoRosa.jpg', precio: 138, categoria: 'conjunto' },
      { id: 'conjuntoplaya', nombre: 'Conjunto Coral y Encaje', imagen: 'img/ConjuntoRosaPlaya.jpg', precio: 125, categoria: 'conjunto' },
      { id: 'gabardina', nombre: 'Gabardina Medianoche', imagen: 'img/GabardinaNegro.jpg', precio: 230, categoria: 'abrigo' },
      { id: 'vestidoceleste', nombre: 'Vestido Cielo Teatral', imagen: 'img/VestidoCeleste.jpg', precio: 155, categoria: 'vestido' },
    ];
  }
}
