import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimendLawComponent } from './crimend-law.component';

describe('CrimendLawComponent', () => {
  let component: CrimendLawComponent;
  let fixture: ComponentFixture<CrimendLawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrimendLawComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimendLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
