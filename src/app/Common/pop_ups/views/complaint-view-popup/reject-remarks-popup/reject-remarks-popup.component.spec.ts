import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectRemarksPopupComponent } from './reject-remarks-popup.component';

describe('RejectRemarksPopupComponent', () => {
  let component: RejectRemarksPopupComponent;
  let fixture: ComponentFixture<RejectRemarksPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectRemarksPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectRemarksPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
