import { FormControl } from "@angular/forms";

export interface DentalServiceRequest{
    name: string
}

export interface DentalServiceDTO{
    id: number,
    name: string
}

export interface DentalService{
    id: number,
    name: string
}

export interface IDentalServiceForm{
  name: FormControl<string>;
}