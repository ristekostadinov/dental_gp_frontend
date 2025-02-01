import { Component, OnInit, Signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import {MatTableModule} from '@angular/material/table'
import { UserDTO } from '../domains/User';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  imports: [MatCardModule, MatInputModule, MatListModule, MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  displayedColumns: string [] = ['id', 'username', 'roles', 'edit/delete'];
  dataSource : UserDTO[] = [];

  constructor(private _userService: UserService, private _router: Router ){
  }

  ngOnInit() : void{
    this._userService.findAll()
      .subscribe(it => this.dataSource = it);
  }

  delete(id: string){
    this._userService.delete(id).subscribe(()=>{
      this._router.navigate(['admin-panel']);
    })
  }
}
