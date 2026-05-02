import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../core/services/customer.service';
import { Customer } from '../../models/customer.model';
import { Modal } from '../../shared/components/modal/modal';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, Modal],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private customerService = inject(CustomerService);

  readonly isRegistered = this.customerService.isRegistered;
  readonly loading = this.customerService.loading;
  readonly customerName = () => this.customerService.currentCustomer()?.nombre ?? '';

  /** Formulario */
  form: Customer = {
    nombre: '',
    apellidos: '',
    direccion: '',
    correo: '',
  };

  showSuccessModal = signal(false);
  showErrorModal = signal(false);
  errorMessage = signal('');

  async onSubmit(): Promise<void> {
    // Validación básica
    if (!this.form.nombre || !this.form.apellidos || !this.form.direccion || !this.form.correo) {
      this.errorMessage.set('Todos los campos son obligatorios.');
      this.showErrorModal.set(true);
      return;
    }

    const result = await this.customerService.register(this.form);

    if (result.success) {
      this.showSuccessModal.set(true);
    } else {
      this.errorMessage.set(result.error ?? 'Error al registrar.');
      this.showErrorModal.set(true);
    }
  }

  closeModal(): void {
    this.showSuccessModal.set(false);
    this.showErrorModal.set(false);
  }

  logout(): void {
    this.customerService.logout();
    this.form = { nombre: '', apellidos: '', direccion: '', correo: '' };
  }
}
