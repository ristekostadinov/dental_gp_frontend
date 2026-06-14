import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IDentalServiceForm } from '../../domains/DentalService';
import { DentalServiceManager } from '../../services/dental.service.manager';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-dental-service',
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
  templateUrl: './create-dental-service.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './create-dental-service.component.css',
})
export class CreateDentalServiceComponent implements OnInit {
  createDentalServiceForm!: FormGroup<IDentalServiceForm>;
  constructor(
    private _formBuilder: FormBuilder, 
    private _dentalServiceManager: DentalServiceManager,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.createDentalServiceForm = this._formBuilder.nonNullable.group({
      name: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.createDentalServiceForm.valid) {
      const formValue = this.createDentalServiceForm.getRawValue();
      if (formValue.name != undefined) {
        const dentalServiceRequest = {
          name: formValue.name,
        };
        this._dentalServiceManager.save(dentalServiceRequest).subscribe(() => {
          this._router.navigate(['/dental-service-list']);
        });
      }
    }
  }

  get name() {
    return this.createDentalServiceForm.get('name');
  }
}
