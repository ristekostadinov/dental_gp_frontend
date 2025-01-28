import { Component, Input, OnInit, signal } from '@angular/core';
import { User } from '../domains/User';
import { Role } from '../domains/Role';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox'

@Component({
  selector: 'app-edit-user',
  imports: [MatInputModule, MatFormField, MatSelectModule, MatButtonModule, MatIconModule,FormsModule, ReactiveFormsModule, MatCheckboxModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit{
  @Input() id! : string;
  user: User = {};
  userRoles: Role[] = []; 
  editUserForm: FormGroup= new FormGroup({});
  hide = signal(true);

  constructor(private _userService: UserService, private _builder: FormBuilder, private _roleService: RoleService){
  }

  ngOnInit(): void {
    this._userService.findById(this.id).subscribe(val => this.user);
    this._roleService.findAll().subscribe(response =>  this.userRoles = response);
    
    this.editUserForm = this._builder.group({
        firstName: new FormControl(`${this.user.firstName}`, [Validators.required]),
        lastName: new FormControl(`${this.user.lastName}`, [Validators.required]),
        username: new FormControl(`${this.user.username}`, [Validators.required]),
        email: new FormControl(`${this.user.email}`, [Validators.email, Validators.required]),
        password: new FormControl(`${this.user.password}`, [Validators.minLength(8), Validators.required]),
        roles: new FormArray([])
    });

  }
  

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit(){}

  get firstName(){
    return this.editUserForm.get('firstName')
  }

  get lastName(){
    return this.editUserForm.get('lastName')
  }

  get username(){
    return this.editUserForm.get('username')
  }

  get email(){
    return this.editUserForm.get('email')
  }

  get password(){
    return this.editUserForm.get('password');
  }

  get roles(){
    return this.editUserForm.get('roles');
  }

  get rolesList(){
    return this.userRoles;
  }
}
