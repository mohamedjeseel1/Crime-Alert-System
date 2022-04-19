import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleEditPopupComponent } from './rule-edit-popup.component';

describe('RuleEditPopupComponent', () => {
  let component: RuleEditPopupComponent;
  let fixture: ComponentFixture<RuleEditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleEditPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
