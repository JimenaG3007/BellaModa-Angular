import { Component, input, output, signal } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<Product>();
  addToCart = output<Product>();

  showMessage = signal(false);

  onAdd(): void {
    this.addToCart.emit(this.product());
    this.showMessage.set(true);
    setTimeout(() => this.showMessage.set(false), 1500);
  }
}
