import { FormArray, FormControl } from "@angular/forms";

export interface Patient{
    id: number;
    firstName: string; 
    lastName: string; 
    email: string; 
    phoneNumber: string;
    insurance:boolean;
    password: string;
}

export interface PatientDTO{
    id: number;
    firstName: string;
    lastName: string;
    insurance: boolean;
}

export interface PatientRequest{
    firstName: string; 
    lastName: string; 
    email: string; 
    phoneNumber: string;
    insurance?: boolean;
    password: string;
}

export interface IPatientForm{
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  phoneNumber: FormControl<string>;
  insurance: FormControl<string>;
  password: FormControl<string>;
}