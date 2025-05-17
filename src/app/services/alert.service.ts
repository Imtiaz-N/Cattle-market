import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private toast: MessageService) {}

  success(message: string) {
    this.toast.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  error(message: string) {
    this.toast.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  info(message: string) {
    this.toast.add({
      severity: 'info',
      summary: 'Info',
      detail: message,
    });
  }

  warn(message: string) {
    this.toast.add({
      severity: 'warn',
      summary: 'Warning',
      detail: message,
    });
  }
}
