import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationPreviewComponent } from './location-preview.component';

describe('LocationPreviewComponent', () => {
  let component: LocationPreviewComponent;
  let fixture: ComponentFixture<LocationPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
