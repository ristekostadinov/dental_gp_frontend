import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DentalServiceManager } from '../../services/dental.service.manager';
import { Router } from '@angular/router';
import { IDentalServiceForm } from '../../domains/DentalService';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-dental-service',
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
  templateUrl: './edit-dental-service.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './edit-dental-service.component.css',
})
export class EditDentalServiceComponent implements OnInit {
  @Input() id!: string;
  editDentalServiceForm!: FormGroup<IDentalServiceForm>;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _dentalServiceManager: DentalServiceManager
  ) {}

  ngOnInit(): void {
    this.editDentalServiceForm = this._formBuilder.nonNullable.group({
      name: ['', [Validators.required]],
    });
    this._dentalServiceManager.findById(this.id).subscribe((response) => {
      this.editDentalServiceForm.patchValue({
        name: response.name,
      });
    });
  }

  get name() {
    return this.editDentalServiceForm.get('name');
  }

  onSubmit() {
    if (this.editDentalServiceForm.valid) {
      const formValue = this.editDentalServiceForm.getRawValue();
      if (formValue.name != undefined) {
        const dentalServiceRequest = {
          name: formValue.name,
        };
        this._dentalServiceManager
          .edit(this.id, dentalServiceRequest)
          .subscribe(() => {
            this._router.navigate(['/dental-service-list']);
          });
      }
    }
  }
}
