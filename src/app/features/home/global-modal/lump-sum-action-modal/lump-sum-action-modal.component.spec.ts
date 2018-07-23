import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LumpSumActionModalComponent } from './lump-sum-action-modal.component';

describe('LumpSumActionModalComponent', () => {
  let component: LumpSumActionModalComponent;
  let fixture: ComponentFixture<LumpSumActionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LumpSumActionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LumpSumActionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
