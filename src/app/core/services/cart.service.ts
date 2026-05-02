import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartItem } from '../../models/cart-item.model';

/**
 * Servicio del carrito de compras.
 * Estado 100% con Signals, persistencia en localStorage.
 */
@Injectable({ providedIn: 'root' })
export class CartService {
  /** Estado del carrito */
  private _items = signal<CartItem[]>(this.loadFromStorage());

  /** Signals públicas */
  readonly items = this._items.asReadonly();

  /** Total de artículos (sumando cantidades) */
  readonly totalItems = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0)
  );

  /** Precio total del carrito */
  readonly totalPrice = computed(() =>
    this._items().reduce((sum, item) => sum + (item.product.precio * item.quantity), 0)
  );

  /** ¿El carrito está vacío? */
  readonly isEmpty = computed(() => this._items().length === 0);

  /** Agregar producto al carrito */
  addItem(product: Product): void {
    const current = this._items();
    const existing = current.find(item => item.product.id === product.id);

    if (existing) {
      this._items.set(
        current.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      this._items.set([...current, { product, quantity: 1 }]);
    }
    this.saveToStorage();
  }

  /** Eliminar una unidad del producto */
  removeOne(productId: string): void {
    const current = this._items();
    const existing = current.find(item => item.product.id === productId);

    if (existing && existing.quantity > 1) {
      this._items.set(
        current.map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      this._items.set(current.filter(item => item.product.id !== productId));
    }
    this.saveToStorage();
  }

  /** Eliminar producto completo del carrito */
  removeItem(productId: string): void {
    this._items.set(this._items().filter(item => item.product.id !== productId));
    this.saveToStorage();
  }

  /** Vaciar todo el carrito */
  clearCart(): void {
    this._items.set([]);
    this.saveToStorage();
  }

  /** Guardar en localStorage */
  private saveToStorage(): void {
    localStorage.setItem('bella-moda-cart', JSON.stringify(this._items()));
  }

  /** Cargar desde localStorage */
  private loadFromStorage(): CartItem[] {
    try {
      const data = localStorage.getItem('bella-moda-cart');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }
}
