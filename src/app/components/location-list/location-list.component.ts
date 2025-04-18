import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { RouterLink } from '@angular/router';
import { LocationDTO } from '../domains/Location';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-location-list',
  imports: [
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.css',
})
export class LocationListComponent implements OnInit {
  locations: LocationDTO[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;
  displayedColumns: string[] = ['id', 'name', 'resources'];
  constructor(private _locationService: LocationService) {}

  ngOnInit(): void {
    this.loadLoadLocations();
  }

  loadLoadLocations() {
    this._locationService
    .findAll(this.pageIndex, this.pageSize)
    .subscribe((response) => {
      this.locations = response.content;
      this.totalElements = response.totalElements;
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.loadLoadLocations();
  }
}
