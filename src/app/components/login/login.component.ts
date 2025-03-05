import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
// import { BrowserAnimationModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CardModule, InputTextModule, ReactiveFormsModule, ButtonModule, RouterModule, CommonModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  loginUser() {
    const {email, password} = this.loginForm.value;
    this.authService.getUserByEmail(email).subscribe(
      response => {
        if (response.length > 0 && response[0].password === password) {
          sessionStorage.setItem('email', email);
          this.router.navigate(['/home']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email or Password is wrong', life: 3000 });
        }
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong', life: 3000 });
      }
    )
  }
}

