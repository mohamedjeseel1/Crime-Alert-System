import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintEditPopupComponent } from './complaint-edit-popup.component';

describe('ComplaintEditPopupComponent', () => {
  let component: ComplaintEditPopupComponent;
  let fixture: ComponentFixture<ComplaintEditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintEditPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
