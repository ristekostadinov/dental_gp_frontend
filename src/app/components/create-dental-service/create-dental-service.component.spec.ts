import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDentalServiceComponent } from './create-dental-service.component';

describe('CreateDentalServiceComponent', () => {
  let component: CreateDentalServiceComponent;
  let fixture: ComponentFixture<CreateDentalServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDentalServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDentalServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
