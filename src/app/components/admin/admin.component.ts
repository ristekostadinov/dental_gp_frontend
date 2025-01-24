import { Component, OnInit, Signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import {MatTableModule} from '@angular/material/table'
import { UserListItem } from '../domains/UserListItem';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-admin',
  imports: [MatCardModule, MatInputModule, MatListModule, MatTableModule, MatButtonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})



export class AdminComponent implements OnInit{
  displayedColumns: string [] = ['id', 'username', 'roles', 'edit/delete'];
  //dataSource=ELEMENT_DATA;
  dataSource : UserListItem[] = [];

  users: UserListItem[] = []

  constructor(private _userService: UserService ){
  }

  ngOnInit() : void{
    this._userService.findAll().subscribe(it => this.users = it);
    this.dataSource = this.users;
  }
}
