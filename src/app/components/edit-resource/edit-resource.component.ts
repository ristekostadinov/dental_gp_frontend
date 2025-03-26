import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IResourceForm, ResourceRequest } from '../domains/Resource';
import { Router } from '@angular/router';
import { ResourceService } from '../../services/resource.service';
import { Resource } from '../domains/Resource';

@Component({
  selector: 'app-edit-resource',
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
  templateUrl: './edit-resource.component.html',
  styleUrl: './edit-resource.component.css'
})
export class EditResourceComponent implements OnInit {
  @Input() id!: string;
  editResourceForm!: FormGroup<IResourceForm>;
  resource!: Resource;
  constructor(private _formBuilder: FormBuilder, private router: Router, private resourceService: ResourceService) {

  }

  ngOnInit(): void {
    this.editResourceForm = this._formBuilder.nonNullable.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.resourceService.findById(this.id).subscribe((response) => {
      this.resource = response;
      this.editResourceForm.patchValue({
        name: this.resource.name,
        address: this.resource.address,
        description: this.resource.description,
      });
    }
    );

  }

  onSubmit() {
    if(!this.editResourceForm.valid) {
      return;
    }
    const formValue = this.editResourceForm.value;
    if(formValue.name != undefined && formValue.address != undefined && formValue.description != undefined) {
      const resourceRequest: ResourceRequest = {
        name: formValue.name,
        address: formValue.address,
        description: formValue.description,
      }
      this.resourceService.edit(this.id, resourceRequest).subscribe(() => {
        this.router.navigate(['/resource-list']);
      });
    }
  }

  get name() {
    return this.editResourceForm.get('name');
  }

  get address() {
    return this.editResourceForm.get('address');
  }

  get description() {
    return this.editResourceForm.get('description');
  }
}
