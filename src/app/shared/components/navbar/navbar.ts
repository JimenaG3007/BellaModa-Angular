import { Component, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { CustomerService } from '../../../core/services/customer.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private cartService = inject(CartService);
  private customerService = inject(CustomerService);

  readonly totalItems = this.cartService.totalItems;
  readonly isRegistered = this.customerService.isRegistered;
  readonly customerName = computed(() => this.customerService.currentCustomer()?.nombre ?? '');

  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  logout(): void {
    this.customerService.logout();
  }
}
