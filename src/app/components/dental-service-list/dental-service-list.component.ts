import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { DentalServiceDTO } from '../domains/DentalService';
import { DentalServiceManager } from '../../services/dental.service.manager';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-dental-service-list',
  imports: [
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './dental-service-list.component.html',
  styleUrl: './dental-service-list.component.css',
})
export class DentalServiceListComponent implements OnInit {
  dentalServiceList: DentalServiceDTO[] = [];
  pageIndex = 0;
  pageSize = 5;
  totalElements = 0;
  displayedColumns: string[] = ['id', 'name', 'edit/delete'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _dentalServiceManager: DentalServiceManager) {}

  ngOnInit(): void {
    this.loadDentalServices();
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.loadDentalServices();
  }

  loadDentalServices() {
    this._dentalServiceManager
      .findAll(this.pageIndex, this.pageSize)
      .subscribe((response) => {
        this.dentalServiceList = response.content;
        this.totalElements = response.totalElements;
      });
  }

  deleteDentalService(id: string) {
    this._dentalServiceManager.delete(id).subscribe((response) => {
      this.loadDentalServices();
    });
  }
}
