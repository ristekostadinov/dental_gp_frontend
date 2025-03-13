import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../services/category.service';
import { ICategoryForm, CategoryRequest } from '../domains/Category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  imports: [    
    MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      MatButtonModule,
      MatIconModule,
      FormsModule,
      ReactiveFormsModule,
      MatSelectModule
    ],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent implements OnInit {
  createCategoryForm!: FormGroup<ICategoryForm>;
  constructor(
    private _categoryService: CategoryService, 
    private _formBuilder: FormBuilder, 
    private _router: Router
  ) { }

  ngOnInit():void{
    this.createCategoryForm = this._formBuilder.nonNullable.group({
      name: ['', [Validators.required]]
    });
  }

  onSubmit(){

    if(this.createCategoryForm.valid){
      const formValue = this.createCategoryForm.getRawValue();
      if(formValue.name != undefined){
        const categoryRequest: CategoryRequest = {
          name: formValue.name
        }
        this._categoryService.save(categoryRequest).subscribe(
          () =>{
            this._router.navigate(['/categories-list']);
          }
        )
      }
    }

  }

  get name(){
    return this.createCategoryForm.get('name');
  }

}
