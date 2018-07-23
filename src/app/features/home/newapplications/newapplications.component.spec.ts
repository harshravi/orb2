import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewapplicationsComponent } from './newapplications.component';

describe('NewapplicationsComponent', () => {
  let component: NewapplicationsComponent;
  let fixture: ComponentFixture<NewapplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewapplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewapplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
