import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CAreaEditPopupComponent } from './c-area-edit-popup.component';

describe('CAreaEditPopupComponent', () => {
  let component: CAreaEditPopupComponent;
  let fixture: ComponentFixture<CAreaEditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CAreaEditPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CAreaEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
