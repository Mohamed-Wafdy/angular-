import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, AuthResponse } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly API_URL = 'https://full.faedg.com/public/api/client';
    private readonly TOKEN_KEY = 'auth_token';
    private readonly USER_KEY = 'current_user';

    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient, private router: Router) {
        this.loadStoredUser();
        // Debug: Log initial state
        console.log('AuthService initialized');
        console.log('Stored token:', this.getToken());
        console.log('Stored user:', this.getCurrentUser());
    }

    private loadStoredUser(): void {
        const storedUser = localStorage.getItem(this.USER_KEY);
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                console.log('Loading stored user:', user);
                this.currentUserSubject.next(user);
            } catch (e) {
                console.error('Error parsing stored user:', e);
                localStorage.removeItem(this.USER_KEY);
            }
        }
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    login(email: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.API_URL}/customer_login`, { email, password })
            .pipe(
                tap(response => {
                    console.log('Login response:', response);
                    if (response.status === 'Success' && response.data) {
                        // Store user data
                        const userData = response.data;
                        console.log('Storing user data:', userData);
                        localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
                        this.currentUserSubject.next(userData);

                        // Store token if available
                        if (response.data.token) {
                            localStorage.setItem(this.TOKEN_KEY, response.data.token);
                        }

                        // Navigate to home page after successful login
                        this.router.navigate(['/home']);
                    }
                })
            );
    }

    getProfile(): Observable<AuthResponse> {
        const token = this.getToken();
        if (!token) {
            console.warn('No token found, redirecting to login');
            this.router.navigate(['/login']);
            return new Observable();
        }

        return this.http.get<AuthResponse>(`${this.API_URL}/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).pipe(
            tap(response => {
                if (response.status === 'Success' && response.data) {
                    // Update stored user data with fresh data
                    console.log('Updating user data from profile:', response.data);
                    localStorage.setItem(this.USER_KEY, JSON.stringify(response.data));
                    this.currentUserSubject.next(response.data);
                }
            })
        );
    }

    logout(): void {
        console.log('Logging out, clearing data');
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        const isLoggedIn = this.currentUserSubject.value !== null && !!this.getToken();
        console.log('Checking login state:', isLoggedIn);
        return isLoggedIn;
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }
} 