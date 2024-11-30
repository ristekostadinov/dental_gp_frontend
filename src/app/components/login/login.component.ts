import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [MatFormField, MatButton, MatLabel, MatHint,MatError, MatIcon, RouterLink, ReactiveFormsModule, MatInput],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hide = signal(true);

  loginForm: FormGroup;

  constructor(_auth: AuthService, _router: Router, formBuilder: FormBuilder){
    this.loginForm = formBuilder.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  onSubmit(){
    console.log("login user");
  }
}
