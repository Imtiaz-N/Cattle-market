import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    this.isAuthenticated.next(!!token);
  }

  login(username: string, password: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/auth/login`, { username, password })
      .pipe(
        tap((response: any) => {
          // Store JWT token from response
          localStorage.setItem('token', response.token);
          this.isAuthenticated.next(true);
        }),
        catchError((error) => {
          this.isAuthenticated.next(false);
          return throwError(
            () =>
              new Error(
                error.error?.message ||
                  'Login failed. Please check your credentials.'
              )
          );
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  get currentToken(): string | null {
    return localStorage.getItem('token');
  }
}
