import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearConfirmationModalComponent } from './clear-confirmation-modal.component';

describe('ClearConfirmationModalComponent', () => {
  let component: ClearConfirmationModalComponent;
  let fixture: ComponentFixture<ClearConfirmationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearConfirmationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
