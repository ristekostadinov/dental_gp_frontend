import { Component, computed, Input, OnInit, Signal, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { User, EditUserRequest } from '../domains/User';
import { Role } from '../domains/Role';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { forkJoin } from 'rxjs';
import { Router} from '@angular/router';

interface IEditUserForm{
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

interface IEditRoles{
  roles: FormArray<FormControl<number|null>>;
}

@Component({
  selector: 'app-edit-user',
  imports: [
    MatInputModule,
    MatFormField,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    NgFor,
    NgIf,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent implements OnInit {
  @Input() id!: string;
  user!: User;
  userRoles: Role[] = [];
  selectedRoles: number[] = [];

  editUserForm: FormGroup<IEditUserForm> = this._builder.nonNullable.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
  });
  
  rolesGroup: FormGroup<IEditRoles> = this._builder.nonNullable.group({
    roles: new FormArray<FormControl<number|null>>([])
  });

  hide = signal(true);

  constructor(
    private _userService: UserService,
    private _builder: FormBuilder,
    private _roleService: RoleService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    forkJoin([
      this._userService.findById(this.id),
      this._roleService.findAll(),
    ]).subscribe((stream) => {
      this.user = stream[0];
      this.userRoles = stream[1];

      if(this.user.roles){
        this.user.roles.forEach(role => {this.selectedRoles.push(role.id)})
      }
        
      this.editUserForm.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        username: this.user.username,
        email: this.user.email,
        password: this.user.password
      });

      this.rolesGroup = this._builder.nonNullable.group({
        roles: this.buildRoles()
      })
    });
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
    event.preventDefault();
  }

  onSubmit(): void {
    const finalRolesId : number [] = [];

   this.rolesGroup.value.roles?.forEach((el) => {
    if(typeof(el) === 'number')
      finalRolesId.push(el);
   })

    console.log(finalRolesId);
    let value = this.editUserForm.getRawValue();
    if(value.firstName != null && value.lastName!=null && value.username!=null && value.email != null && value.password != null){
      let editUserRequest : EditUserRequest = {
        firstName: value.firstName,
        lastName: value.lastName,
        username: value.username,
        email: value.email,
        password: value.password,
        rolesId: finalRolesId
      }
      this._userService.update(this.id, editUserRequest).subscribe((it)=>{
        this._router.navigate(['admin-panel']);
      });
    }
  }
  getRole(i: number){
    return this.userRoles[i];
  }
  getRoleName(i: number){
    return this.userRoles[i].name;
  }

  isChecked(role : AbstractControl){
    if(typeof(role.value) === 'number'){
      if (this.selectedRoles.includes(role.value))
        console.log(role.value);
        return 'checked';
    }
   return 'unchecked'
  }

  buildRoles(): FormArray<FormControl<number|null>>{
    const arr = this.userRoles.map(role => {
      return this._builder.control(role.id)
    })

    return this._builder.array(arr);
  }
  
  get firstName() {
    return this.editUserForm.get('firstName');
  }

  get lastName() {
    return this.editUserForm.get('lastName');
  }

  get username() {
    return this.editUserForm.get('username');
  }

  get email() {
    return this.editUserForm.get('email');
  }

  get password() {
    return this.editUserForm.get('password');
  }

  get roles() {
    return this.rolesGroup.get('roles') as FormArray;
  }

  get rolesList() {
    return this.userRoles;
  }
}
