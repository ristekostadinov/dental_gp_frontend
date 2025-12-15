import { Component, OnInit } from '@angular/core';
import { IResourceForm, ResourceRequest } from '../../domains/Resource';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ResourceService } from '../../services/resource.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create-resource',
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
  templateUrl: './create-resource.component.html',
  styleUrl: './create-resource.component.css',
})
export class CreateResourceComponent implements OnInit {
  createResourceForm!: FormGroup<IResourceForm>;

  constructor(
    private _formBuilder: FormBuilder,
    private _resourceService: ResourceService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.createResourceForm = this._formBuilder.nonNullable.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get name() {
    return this.createResourceForm.get('name');
  }

  get address() {
    return this.createResourceForm.get('address');
  }

  get description() {
    return this.createResourceForm.get('description');
  }

  onSubmit() {
    if (this.createResourceForm.invalid) {
      return;
    }
    const formValue = this.createResourceForm.value;
    if (
      formValue.name != undefined &&
      formValue.address != undefined &&
      formValue.description != undefined
    ) {
      const resourceRequest: ResourceRequest = {
        name: formValue.name,
        address: formValue.address,
        description: formValue.description,
      };
      this._resourceService.save(resourceRequest).subscribe(() => {
        this._router.navigate(['/resource-list']);
      });
    }
  }
}
