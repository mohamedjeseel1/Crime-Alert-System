import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedPopupComponent } from './accepted-popup.component';

describe('AcceptedPopupComponent', () => {
  let component: AcceptedPopupComponent;
  let fixture: ComponentFixture<AcceptedPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptedPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
