import { Component, Input, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { IPatientForm, Patient, PatientRequest } from '../domains/Patient';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-edit-patient',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
  ],
  templateUrl: './edit-patient.component.html',
  styleUrl: './edit-patient.component.css',
})
export class EditPatientComponent implements OnInit {
  hide = signal(true);
  @Input() id!: string;
  patient!: Patient;
  patientInsurance: boolean[] = [true, false];

  editPatientForm: FormGroup<IPatientForm> =
    this._formBuilder.nonNullable.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[- +()0-9]+$')],
      ],
      insurance: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _patientService: PatientService
  ) {}

  ngOnInit(): void {
    this._patientService.findById(this.id).subscribe((response) => {
      this.patient = response;
      this.editPatientForm.patchValue({
        firstName: this.patient.firstName,
        lastName: this.patient.lastName,
        email: this.patient.email,
        phoneNumber: this.patient.phoneNumber,
        insurance: `${this.patient.insurance}`,
        password: this.patient.password,
      });
    });
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    //event.stopPropagation();
  }

  get firstName() {
    return this.editPatientForm.get('firstName');
  }

  get lastName() {
    return this.editPatientForm.get('lastName');
  }

  get email() {
    return this.editPatientForm.get('email');
  }

  get phoneNumber() {
    return this.editPatientForm.get('phoneNumber');
  }

  get insurance() {
    return this.editPatientForm.get('insurance');
  }

  get password() {
    return this.editPatientForm.get('password');
  }

  convertToBolean(params: string): boolean {
    if (params == 'true') return true;
    return false;
  }

  onSubmit() {
    if (this.editPatientForm.valid) {
      const formValue = this.editPatientForm.getRawValue();
      if (
        formValue.firstName != undefined &&
        formValue.lastName != undefined &&
        formValue.email != undefined &&
        formValue.phoneNumber != undefined &&
        formValue.insurance != undefined &&
        formValue.password != undefined
      ) {
        const patientRequest: PatientRequest = {
          firstName: formValue.firstName,
          lastName: formValue.lastName,
          email: formValue.email,
          phoneNumber: formValue.phoneNumber,
          insurance: this.convertToBolean(formValue.insurance),
          password: formValue.password,
        };

        this._patientService.edit(this.id, patientRequest).subscribe(() => {
          this._router.navigate(['patient-list']);
        });
      }
    }
  }
}
