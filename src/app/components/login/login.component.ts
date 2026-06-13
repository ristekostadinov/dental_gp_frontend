import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatInput } from '@angular/material/input';
import { BroadcastService } from '../../services/broadcast.service';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [
    MatFormField,
    MatButton,
    MatLabel,
    MatIcon,
    RouterLink,
    ReactiveFormsModule,
    MatInput,
    MatCardModule,
    MatError
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './login.component.css',
})
export class LoginComponent {
  hide = signal(true);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  constructor(
    private _auth: AuthService,
    private broadcastService: BroadcastService,
    private _router: Router,
    private snackbar: MatSnackBar
  ) {}

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    this.broadcastService.broadcastLogout();
    const { email, password } = this.loginForm.value;
    console.log(email, password);
    this._auth.login(email, password).subscribe({
      next: () => {
        this._router.navigate(['/admin-panel']);
      },
      error: (err) => {
        // Handle invalid credentials or other errors here
        console.error('Login error:', err);

        this.snackbar.open('Invalid email or password', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'], // optional styling class
        });
      },
    });
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }
}
