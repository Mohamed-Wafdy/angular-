import { Component } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userLogin = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  submissionMessage = '';

  constructor(private globalService: GlobalService) { }

  handleSubmit(form: any): void {
    if (form.valid) {
      if (this.userLogin.password !== this.userLogin.confirmPassword) {
        this.submissionMessage = 'Passwords do not match!';
        return;
      }
      this.globalService.registerUser(this.userLogin).subscribe(
        response => {
          this.submissionMessage = 'Registration successful!';
          form.reset();
        },
        error => {
          this.submissionMessage = 'Registration failed. Please try again.';
        }
      );
    }
  }
}
