import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhysicalGroupModalComponent } from './edit-physical-group-modal.component';

describe('EditPhysicalGroupComponent', () => {
  let component: EditPhysicalGroupModalComponent;
  let fixture: ComponentFixture<EditPhysicalGroupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPhysicalGroupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhysicalGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
