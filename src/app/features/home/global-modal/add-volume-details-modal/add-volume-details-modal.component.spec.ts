import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVolumeDetailsModalComponent } from './add-volume-details-modal.component';

describe('AddUserComponent', () => {
  let component: AddVolumeDetailsModalComponent;
  let fixture: ComponentFixture<AddVolumeDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVolumeDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVolumeDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
