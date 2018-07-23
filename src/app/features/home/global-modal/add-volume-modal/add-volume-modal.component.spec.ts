import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVolumeModalComponent } from './add-volume-modal.component';

describe('AddVolumeModalComponent', () => {
  let component: AddVolumeModalComponent;
  let fixture: ComponentFixture<AddVolumeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVolumeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVolumeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
