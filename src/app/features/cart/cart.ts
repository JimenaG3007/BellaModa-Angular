import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { CustomerService } from '../../core/services/customer.service';
import { Modal } from '../../shared/components/modal/modal';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, Modal],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  private cartService = inject(CartService);
  private customerService = inject(CustomerService);

  readonly items = this.cartService.items;
  readonly totalItems = this.cartService.totalItems;
  readonly totalPrice = this.cartService.totalPrice;
  readonly isEmpty = this.cartService.isEmpty;
  readonly isRegistered = this.customerService.isRegistered;

  /** Modal states */
  showSuccessModal = signal(false);
  showEmptyModal = signal(false);
  showRegisterModal = signal(false);

  addOne(productId: string): void {
    const item = this.items().find(i => i.product.id === productId);
    if (item) this.cartService.addItem(item.product);
  }

  removeOne(productId: string): void {
    this.cartService.removeOne(productId);
  }

  removeItem(productId: string): void {
    this.cartService.removeItem(productId);
  }

  checkout(): void {
    if (this.isEmpty()) {
      this.showEmptyModal.set(true);
    } else if (!this.isRegistered()) {
      this.showRegisterModal.set(true);
    } else {
      this.cartService.clearCart();
      this.showSuccessModal.set(true);
    }
  }

  closeModal(): void {
    this.showSuccessModal.set(false);
    this.showEmptyModal.set(false);
    this.showRegisterModal.set(false);
  }
}
