import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-navbar',
    standalone: false,
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    currentUser$: Observable<User | null>;

    constructor(private authService: AuthService) {
        this.currentUser$ = this.authService.currentUser$;
        this.currentUser$.subscribe(user => {
            console.log('Current user in navbar:', user);
        });
    }

    ngOnInit(): void {
        const currentUser = this.authService.getCurrentUser();
        console.log('Initial user state:', currentUser);
    }

    logout(event: Event): void {
        event.preventDefault();
        this.authService.logout();
    }
} 