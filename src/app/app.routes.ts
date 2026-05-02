import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then(m => m.Home),
    title: 'Bella Moda | Inicio',
  },
  {
    path: 'catalogo',
    loadComponent: () => import('./features/catalog/catalog').then(m => m.Catalog),
    title: 'Bella Moda | Catálogo',
  },
  {
    path: 'carrito',
    loadComponent: () => import('./features/cart/cart').then(m => m.Cart),
    title: 'Bella Moda | Carrito',
  },
  {
    path: 'contacto',
    loadComponent: () => import('./features/contact/contact').then(m => m.Contact),
    title: 'Bella Moda | Contacto',
  },
  {
    path: 'registrar',
    loadComponent: () => import('./features/register/register').then(m => m.Register),
    title: 'Bella Moda | Registro',
  },
  {
    path: 'admin/nuevo-producto',
    loadComponent: () => import('./features/admin/add-product/add-product').then(m => m.AddProduct),
    title: 'Bella Moda | Añadir Producto',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
