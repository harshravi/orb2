import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeOpcostComponent } from './volume-opcost.component';

describe('VolumeOpcostComponent', () => {
  let component: VolumeOpcostComponent;
  let fixture: ComponentFixture<VolumeOpcostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeOpcostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeOpcostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
