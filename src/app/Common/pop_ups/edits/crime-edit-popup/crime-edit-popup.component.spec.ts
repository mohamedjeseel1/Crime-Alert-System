import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeEditPopupComponent } from './crime-edit-popup.component';

describe('CrimeEditPopupComponent', () => {
  let component: CrimeEditPopupComponent;
  let fixture: ComponentFixture<CrimeEditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrimeEditPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimeEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
