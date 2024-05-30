import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    console.log('Form Submitted', this.registerForm.value); // Log form submission

    if (this.registerForm.valid) {
      console.log('Form is valid'); // Log form validity
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          console.log('Registration successful'); // Log success
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration failed', err); // Log error
        }
      });
    } else {
      console.log('Form is invalid'); // Log invalid form
    }
  }
}















