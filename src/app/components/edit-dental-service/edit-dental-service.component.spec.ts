import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDentalServiceComponent } from './edit-dental-service.component';

describe('EditDentalServiceComponent', () => {
  let component: EditDentalServiceComponent;
  let fixture: ComponentFixture<EditDentalServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDentalServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDentalServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
