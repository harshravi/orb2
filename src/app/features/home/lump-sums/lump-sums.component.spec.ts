import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LumpSumsComponent } from './lump-sums.component';

describe('LumpSumsComponent', () => {
  let component: LumpSumsComponent;
  let fixture: ComponentFixture<LumpSumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LumpSumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LumpSumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
