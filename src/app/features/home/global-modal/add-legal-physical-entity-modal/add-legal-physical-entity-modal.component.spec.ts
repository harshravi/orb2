import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLegalPhysicalEntityModalComponent } from './add-legal-physical-entity-modal.component';

describe('AddLegalPhysicalEntityComponent', () => {
  let component: AddLegalPhysicalEntityModalComponent;
  let fixture: ComponentFixture<AddLegalPhysicalEntityModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLegalPhysicalEntityModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLegalPhysicalEntityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
