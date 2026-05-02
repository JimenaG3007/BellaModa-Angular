import { Injectable, signal, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Customer } from '../../models/customer.model';

/**
 * Servicio de clientes.
 * Maneja el registro de clientes en Supabase.
 */
@Injectable({ providedIn: 'root' })
export class CustomerService {
  private supabase = inject(SupabaseService);

  /** Estado del registro */
  private _isRegistered = signal<boolean>(this.checkLocalRegistration());
  private _currentCustomer = signal<Customer | null>(this.loadLocalCustomer());
  private _loading = signal<boolean>(false);

  /** Signals públicas */
  readonly isRegistered = this._isRegistered.asReadonly();
  readonly currentCustomer = this._currentCustomer.asReadonly();
  readonly loading = this._loading.asReadonly();

  /** Registrar un nuevo cliente */
  async register(customer: Customer): Promise<{ success: boolean; error?: string }> {
    this._loading.set(true);

    const customerData = {
      ...customer,
      fecha_registro: new Date().toISOString(),
    };

    const { data, error } = await this.supabase.client
      .from('clientes')
      .insert([customerData])
      .select()
      .single();

    this._loading.set(false);

    if (error) {
      console.error('Error registrando cliente:', error);
      // Guardar localmente como respaldo
      this.saveLocalCustomer(customerData);
      this._isRegistered.set(true);
      this._currentCustomer.set(customerData);
      return { success: true };
    }

    const saved = data as Customer;
    this._currentCustomer.set(saved);
    this._isRegistered.set(true);
    this.saveLocalCustomer(saved);

    return { success: true };
  }

  /** Cerrar sesión del cliente */
  logout(): void {
    this._isRegistered.set(false);
    this._currentCustomer.set(null);
    localStorage.removeItem('bella-moda-customer');
  }

  /** Verificar registro local */
  private checkLocalRegistration(): boolean {
    return localStorage.getItem('bella-moda-customer') !== null;
  }

  /** Cargar cliente desde localStorage */
  private loadLocalCustomer(): Customer | null {
    try {
      const data = localStorage.getItem('bella-moda-customer');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  /** Guardar cliente en localStorage */
  private saveLocalCustomer(customer: Customer): void {
    localStorage.setItem('bella-moda-customer', JSON.stringify(customer));
  }
}
