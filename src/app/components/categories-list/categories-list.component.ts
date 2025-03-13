import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CategoryService } from '../../services/category.service';
import { CategoryDTO } from '../domains/Category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories-list',
  imports: [
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css'
})
export class CategoriesListComponent implements OnInit {
  categories: CategoryDTO[] = []
  pageIndex = 0;
  pageSize = 5;
  totalElements = 0;
  displayedColumns: string[] = ['id', 'name', 'edit/delete'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(){
    this._categoryService.findAll(this.pageIndex, this.pageSize).subscribe(response =>{
      this.categories = response.content;
      this.totalElements = response.totalElements;
    })
  }


  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.loadCategories();
  }

  deleteCategory(id: string){
    this._categoryService.delete(id).subscribe(response =>{
      this.loadCategories();
    })
  }

}
