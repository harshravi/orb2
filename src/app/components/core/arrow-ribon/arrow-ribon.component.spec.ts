import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowRibonComponent } from './arrow-ribon.component';

describe('ArrowRibonComponent', () => {
  let component: ArrowRibonComponent;
  let fixture: ComponentFixture<ArrowRibonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrowRibonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrowRibonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
