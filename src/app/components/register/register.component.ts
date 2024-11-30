import { Component, signal } from '@angular/core';
import {MatInputModule} from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ErrorStateMatcher } from '@angular/material/core';
import {
    FormControl,
    FormGroupDirective,
    NgForm,
    Validators,
    FormsModule,
    ReactiveFormsModule
  } from '@angular/forms';

@Component({
    selector: 'app-register',
    imports: [MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatIconModule, FormsModule,ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})



export class RegisterComponent {
    hide = signal(true);
    
    
    clickEvent(event: MouseEvent) {
      this.hide.set(!this.hide());
      event.stopPropagation();
    }

    usernameFormControl = new FormControl('',[Validators.required])
    emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    passwordFormControl= new FormControl('', [Validators.required, Validators.minLength(8)]);
    matcher = new ErrorStateMatcher();
}
