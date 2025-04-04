import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: false,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    user: User | null = null;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.user = this.authService.getCurrentUser();

        // Get fresh data from API
        this.authService.getProfile().subscribe({
            next: (response) => {
                if (response.status === 'Success') {
                    this.user = response.data;
                }
            },
            error: (error) => {
                console.error('Error loading profile:', error);
            }
        });
    }

    getUserInitials(): string {
        if (!this.user) return '';
        const firstName = this.user.customer_first_name.charAt(0);
        const lastName = this.user.customer_last_name.charAt(0);
        return (firstName + lastName).toUpperCase();
    }

    getProgressWidth(value: number): number {
        // Convert the value to a percentage (max 100)
        return Math.min(value * 10, 100);
    }

    navigateToProfile(): void {
        this.router.navigate(['/profile']);
    }
} 