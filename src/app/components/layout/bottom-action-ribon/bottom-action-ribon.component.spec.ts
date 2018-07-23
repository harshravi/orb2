import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomActionRibonComponent } from './bottom-action-ribon.component';

describe('BottomActionRibonComponent', () => {
  let component: BottomActionRibonComponent;
  let fixture: ComponentFixture<BottomActionRibonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomActionRibonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomActionRibonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
