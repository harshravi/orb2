import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceModalComponent } from './add-service-modal.component';

describe('AddServiceModalComponent', () => {
  let component: AddServiceModalComponent;
  let fixture: ComponentFixture<AddServiceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddServiceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
