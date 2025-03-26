import { FormControl } from "@angular/forms";

export interface Resource{
    id: number;
    name: string;
    address: string;
    description: string;
}

export interface ResourceDTO{
    id: number;
    name: string;
    address: string;
    description: string;
}

export interface ResourceRequest{
    name: string,
    address: string,
    description: string,
}

export interface IResourceForm{
    name: FormControl<string>;
    address: FormControl<string>;
    description: FormControl<string>;
}