import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewrulesComponent } from './newrules.component';

describe('NewrulesComponent', () => {
  let component: NewrulesComponent;
  let fixture: ComponentFixture<NewrulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewrulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewrulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
