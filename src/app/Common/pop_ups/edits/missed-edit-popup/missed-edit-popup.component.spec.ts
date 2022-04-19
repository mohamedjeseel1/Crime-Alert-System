import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissedEditPopupComponent } from './missed-edit-popup.component';

describe('MissedEditPopupComponent', () => {
  let component: MissedEditPopupComponent;
  let fixture: ComponentFixture<MissedEditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissedEditPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissedEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
