import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLumpSumModalComponent } from './add-lump-sum-modal.component';

describe('AddLumpSumModalComponent', () => {
  let component: AddLumpSumModalComponent;
  let fixture: ComponentFixture<AddLumpSumModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLumpSumModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLumpSumModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
