import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PatientRequest, IPatientForm } from '../domains/Patient';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-patient',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './create-patient.component.html',
  styleUrl: './create-patient.component.css',
})
export class CreatePatientComponent implements OnInit {
  createPatientForm!: FormGroup<IPatientForm>;
  patientInsurance: boolean[] = [true, false];
  constructor(
    private _formBuilder: FormBuilder,
    private _patientService: PatientService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.createPatientForm = this._formBuilder.nonNullable.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[- +()0-9]+$')],
      ],
      insurance: [''],
    });
  }

  convertToBolean(param: string): boolean {
    if (param == 'true') return true;
    return false;
  }

  onSubmit() {
    if (this.createPatientForm.valid) {
      const formValue = this.createPatientForm.getRawValue();
      if (
        formValue.firstName != undefined &&
        formValue.lastName != undefined &&
        formValue.email != undefined &&
        formValue.phoneNumber != undefined &&
        formValue.insurance != undefined
      ) {
        const patientRequest: PatientRequest = {
          firstName: formValue.firstName,
          lastName: formValue.lastName,
          email: formValue.email,
          phoneNumber: formValue.phoneNumber,
          insurance: this.convertToBolean(formValue.insurance),
        };
        this._patientService.save(patientRequest).subscribe(() => {
          this._router.navigate(['patient-list']);
        });
      }
    }
  }

  get firstName() {
    return this.createPatientForm.get('firstName');
  }

  get lastName() {
    return this.createPatientForm.get('lastName');
  }

  get email() {
    return this.createPatientForm.get('email');
  }

  get phoneNumber() {
    return this.createPatientForm.get('phoneNumber');
  }

  get insurance() {
    return this.createPatientForm.get('insurance');
  }
}
