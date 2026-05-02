import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.html',
})
export class AddProduct {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);

  productForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor() {
    this.productForm = this.fb.group({
      id: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
      nombre: ['', Validators.required],
      precio: [null, [Validators.required, Validators.min(1)]],
      categoria: ['abrigo', Validators.required],
      imagen: ['', Validators.required],
      descripcion: ['']
    });
  }

  async onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const newProduct: Product = this.productForm.value;

    try {
      const result = await this.productService.addProduct(newProduct);
      
      if (result.success) {
        this.successMessage = '¡Producto agregado exitosamente!';
        this.productForm.reset({ categoria: 'abrigo' });
      } else {
        this.errorMessage = result.error || 'Ocurrió un error al guardar el producto.';
      }
    } catch (err: any) {
      this.errorMessage = err.message || 'Ocurrió un error inesperado.';
    } finally {
      this.isSubmitting = false;
    }
  }

  // Genera un ID automático a partir del nombre
  generateId() {
    const nombre = this.productForm.get('nombre')?.value || '';
    if (nombre && !this.productForm.get('id')?.value) {
      const slug = nombre
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, "") // Quitar acentos
        .replace(/[^a-z0-9]+/g, '-') // Reemplazar espacios y especiales con guiones
        .replace(/^-+|-+$/g, ''); // Quitar guiones extra al inicio/fin
      this.productForm.get('id')?.setValue(slug);
    }
  }
}
