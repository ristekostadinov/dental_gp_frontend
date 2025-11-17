import { FormControl } from "@angular/forms";

export interface Category{
    id: number,
    name: string
}

export interface CategoryRequest{
    name: string
}

export interface CategoryDTO{
    id: number,
    name: string
}

export interface ICategoryForm{
  name: FormControl<string>;
}