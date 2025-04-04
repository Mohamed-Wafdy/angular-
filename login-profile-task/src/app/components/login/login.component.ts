import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: false,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/home']);
        }
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    get f() {
        return this.loginForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;
        this.error = '';

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authService.login(this.f['email'].value, this.f['password'].value)
            .subscribe({
                next: (response) => {
                    console.log('Login successful:', response);
                    if (response.status === 'Success') {
                        this.router.navigate(['/home']);
                    } else {
                        this.error = response.message || 'Login failed';
                        this.loading = false;
                    }
                },
                error: (error) => {
                    console.error('Login error:', error);
                    this.error = error.error?.message || 'An error occurred during login';
                    this.loading = false;
                }
            });
    }
} 