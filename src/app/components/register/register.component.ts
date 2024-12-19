import { Component, signal } from '@angular/core';
import {MatInputModule} from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
    FormControl,
    Validators,
    FormsModule,
    ReactiveFormsModule,
    FormGroup,
    FormBuilder
  } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    imports: [MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatIconModule, FormsModule,ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})



export class RegisterComponent {
    hide = signal(true);
    signupForm: FormGroup;
    constructor(private formBuilder:FormBuilder,
        private _router: Router,
        private _auth: AuthService
    ){
        this.signupForm = formBuilder.group({
            firstName: new FormControl('',[Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            username: new FormControl('',[Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(8)])
        });
    }
    
    clickEvent(event: MouseEvent) {
      this.hide.set(!this.hide());
      event.stopPropagation();
    }

    get firstName(){
        return this.signupForm.get('firstName');
    }

    get lastName(){
        return this.signupForm.get('lastName');
    }

    get username(){
        return this.signupForm.get('username');
    }

    get email(){
        return this.signupForm.get('email');
    }

    get password(){
        return this.signupForm.get('password');
    }

    onSubmit() {
        if (this.signupForm.valid) {
          this._auth.signUp(this.signupForm.getRawValue()).subscribe(() => {
            this._router.navigate(['login']);
          });
        }
    }
}
