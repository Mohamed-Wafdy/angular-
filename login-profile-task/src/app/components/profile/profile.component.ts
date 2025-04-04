import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-profile',
    standalone: false,
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    profileForm!: FormGroup;
    user: User | null = null;
    submitted = false;
    message = '';
    error = false;
    loading = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        // First try to get user from current state
        this.user = this.authService.getCurrentUser();
        if (this.user) {
            this.initForm();
        }

        // Then fetch fresh data from API
        this.authService.getProfile().subscribe({
            next: (response) => {
                if (response.status === 'Success') {
                    this.user = response.data;
                    this.initForm();
                }
            },
            error: (error) => {
                console.error('Error loading profile:', error);
                this.error = true;
                this.message = 'Failed to load profile data';
            }
        });
    }

    private initForm(): void {
        if (!this.user) return;

        this.profileForm = this.formBuilder.group({
            customer_first_name: [this.user.customer_first_name, Validators.required],
            customer_last_name: [this.user.customer_last_name, Validators.required],
            customer_email: [this.user.customer_email, [Validators.required, Validators.email]],
            customer_phone: [this.user.customer_phone, Validators.required],
            customer_language: [this.user.customer_language, Validators.required]
        });

        // Debug log
        console.log('Form initialized with:', this.profileForm.value);
    }

    get f() {
        return this.profileForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;
        if (this.profileForm.invalid) {
            return;
        }

        this.loading = true;
        console.log('Submitting form data:', this.profileForm.value);

        // Simulate API call
        setTimeout(() => {
            this.message = 'Profile updated successfully';
            this.error = false;
            this.loading = false;
        }, 1000);
    }
} 