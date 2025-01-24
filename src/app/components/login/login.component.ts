import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatInput } from '@angular/material/input';
import { BroadcastService } from '../../services/broadcast.service';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-login',
  imports: [MatFormField, MatButton, MatLabel, MatIcon, RouterLink, ReactiveFormsModule, MatInput, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hide = signal(true);

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private _auth: AuthService,private broadcastService: BroadcastService,private _router: Router){
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit(){
    this.broadcastService.broadcastLogout();
    const {email, password} = this.loginForm.value;
    this._auth.login(email, password)
      .subscribe((it) => this._router.navigate(['']));
  }
}
