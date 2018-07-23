import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpreadVolumeMaticModalComponent } from './add-spread-volume-matic-modal.component';

describe('AddSpreadVolumeMaticComponent', () => {
  let component: AddSpreadVolumeMaticModalComponent;
  let fixture: ComponentFixture<AddSpreadVolumeMaticModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSpreadVolumeMaticModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpreadVolumeMaticModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
