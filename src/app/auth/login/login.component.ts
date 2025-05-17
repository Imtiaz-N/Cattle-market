import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private alert: AlertService
  ) {}

  onSubmit() {
    this.auth
      .login(this.loginForm.value.username!, this.loginForm.value.password!)
      .subscribe({
        next: () => {
          this.alert.success('Login successful!');
          this.router.navigate(['/cattle']);
        },

        error: (err) => {
          this.alert.error(err.message);
        },
      });
  }
}
