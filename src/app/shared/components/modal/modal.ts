import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  title = input.required<string>();
  message = input.required<string>();
  type = input<'success' | 'error' | 'info'>('success');
  visible = input.required<boolean>();
  close = output<void>();

  onClose(): void {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close.emit();
    }
  }
}
