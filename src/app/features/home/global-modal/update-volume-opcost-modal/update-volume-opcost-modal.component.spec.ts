import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVolumeOpcostModalComponent } from './update-volume-opcost-modal.component';

describe('DeleteConfirmationModalComponent', () => {
  let component: UpdateVolumeOpcostModalComponent;
  let fixture: ComponentFixture<UpdateVolumeOpcostModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateVolumeOpcostModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVolumeOpcostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
