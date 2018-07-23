import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticTempComponent } from './static-temp.component';

describe('StaticTempComponent', () => {
  let component: StaticTempComponent;
  let fixture: ComponentFixture<StaticTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
