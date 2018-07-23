import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumePhysicalDetailsComponent } from './volume-physical-details.component';

describe('VolumePhysicalDetailsComponent', () => {
  let component: VolumePhysicalDetailsComponent;
  let fixture: ComponentFixture<VolumePhysicalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumePhysicalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumePhysicalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
