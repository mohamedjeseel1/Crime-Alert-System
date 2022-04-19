import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriminalDetailsComponent } from './criminal-details.component';

describe('CriminalDetailsComponent', () => {
  let component: CriminalDetailsComponent;
  let fixture: ComponentFixture<CriminalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriminalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriminalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
