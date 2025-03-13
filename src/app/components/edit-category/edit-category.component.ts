import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ICategoryForm } from '../domains/Category';

@Component({
  selector: 'app-edit-category',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit{
  @Input() id!: string;
  editCategoryForm!: FormGroup<ICategoryForm>;
  constructor(
    private _formBuilder: FormBuilder,
    private _categoryService: CategoryService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.editCategoryForm = this._formBuilder.nonNullable.group({
      name: ['', [Validators.required]]
    });
    this._categoryService.findById(this.id).subscribe(response =>{
      this.editCategoryForm.patchValue({
        name: response.name
      })
    })
  }
  
  onSubmit(){
    if(this.editCategoryForm.valid){
      const formValue = this.editCategoryForm.getRawValue();
      if(formValue.name != undefined){
        const categoryRequest = {
          name: formValue.name
        }
        this._categoryService.edit(this.id, categoryRequest).subscribe(
          () =>{
            this._router.navigate(['/category-list']);
          }
        )
      }
    }
  }

  get name(){
    return this.editCategoryForm.get('name');
  }

 
}
