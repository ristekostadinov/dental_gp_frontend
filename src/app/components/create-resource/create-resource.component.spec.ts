import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResourceComponent } from './create-resource.component';

describe('CreateResourceComponent', () => {
  let component: CreateResourceComponent;
  let fixture: ComponentFixture<CreateResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateResourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
