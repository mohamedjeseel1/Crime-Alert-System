import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyEditPopupComponent } from './emergency-edit-popup.component';

describe('EmergencyEditPopupComponent', () => {
  let component: EmergencyEditPopupComponent;
  let fixture: ComponentFixture<EmergencyEditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmergencyEditPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
