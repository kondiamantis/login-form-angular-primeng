import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { passwordMatchValidator } from '../../shared/password-match.directive';
import { AuthService } from '../../services/auth.service';
import { ToastModule } from 'primeng/toast';
// import { BrowserAnimationModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  imports: [CardModule, RouterModule, ReactiveFormsModule, CommonModule, ButtonModule, InputTextModule, ToastModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private authService: AuthService, 
    private messageService: MessageService,
    private router: Router) {

    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    },{
      validators: passwordMatchValidator
    });
  }

  get fullName() {
    return this.registerForm.get('fullName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  submitDetails() {
    const postData = {...this.registerForm.value};
    delete postData.confirmPassword;
    this.authService.registerUser(postData).subscribe(
      (response) => {
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Register successfully', life: 3000 });
        this.router.navigate(['/login']);
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong', life: 3000 });
      }
    )
  }
}
