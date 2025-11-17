import { Component, OnInit, ViewChild } from '@angular/core';
import { ResourceDTO } from '../../domains/Resource';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ResourceService } from '../../services/resource.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-resource-list',
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './resource-list.component.html',
  styleUrl: './resource-list.component.css'
})
export class ResourceListComponent implements OnInit {
  resources: ResourceDTO[] = [];
  pageIndex = 0;
  pageSize = 5;
  totalElements = 0;
  displayedColumns: string[] = ['id', 'name','address', 'description', 'edit/delete'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _resourceService: ResourceService, private _router: Router) {}

  ngOnInit(): void {
    this.loadResources();
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.loadResources();
  }

  loadResources() {
    this._resourceService
      .findAll(this.pageIndex, this.pageSize)
      .subscribe((response) => {
        this.resources = response.content;
        this.totalElements = response.totalElements;
        console.log(this.resources);
      });
  }
  
  deleteResource(id: string) {
    this._resourceService.delete(id).subscribe((response) => {
      this.loadResources();
    });
  }

}
