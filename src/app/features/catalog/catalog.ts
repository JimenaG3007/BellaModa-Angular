import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../models/product.model';
import { ProductCard } from './product-card/product-card';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCard],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  readonly products = this.productService.products;
  readonly loading = this.productService.loading;
  readonly totalItems = this.cartService.totalItems;

  activeFilter = signal<string>('all');

  readonly categories = [
    { key: 'all', label: 'Todos' },
    { key: 'abrigo', label: 'Abrigos' },
    { key: 'chaqueta', label: 'Chaquetas' },
    { key: 'conjunto', label: 'Conjuntos' },
    { key: 'vestido', label: 'Vestidos' },
  ];

  ngOnInit(): void {
    if (this.products().length === 0) {
      this.productService.loadProducts();
    }
  }

  filteredProducts(): Product[] {
    const filter = this.activeFilter();
    if (filter === 'all') return this.products();
    return this.products().filter(p => p.categoria === filter);
  }

  setFilter(category: string): void {
    this.activeFilter.set(category);
  }

  onAddToCart(product: Product): void {
    this.cartService.addItem(product);
  }
}
