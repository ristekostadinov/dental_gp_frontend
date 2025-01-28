import { Component, Input, OnInit, signal } from '@angular/core';
import { User } from '../domains/User';
import { Role } from '../domains/Role';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-user',
  imports: [MatInputModule, MatFormField, MatSelectModule, MatButtonModule, MatIconModule,FormsModule, ReactiveFormsModule],
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
    this._userService.findById(this.id).subscribe(val => this.user = val);
    this._roleService.findAll().subscribe(response => this.userRoles = response);
    
    this.editUserForm = this._builder.group({
        firstName: new FormControl(this.user.firstName),
        lastName: new FormControl(this.user.lastName),
        username: new FormControl(this.user.username),
        email: new FormControl(this.user.email),
        password: new FormControl(this.user.password),
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
}
