import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalConfirmationModalComponent } from './approval-confirmation-modal.component';

describe('ApprovalConfirmationModalComponent', () => {
  let component: ApprovalConfirmationModalComponent;
  let fixture: ComponentFixture<ApprovalConfirmationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalConfirmationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
