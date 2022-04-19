import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeareaComponent } from './crimearea.component';

describe('CrimeareaComponent', () => {
  let component: CrimeareaComponent;
  let fixture: ComponentFixture<CrimeareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrimeareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimeareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
