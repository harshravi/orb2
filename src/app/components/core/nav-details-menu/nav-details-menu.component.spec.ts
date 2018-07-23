import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavDetailsMenuComponent } from './nav-details-menu.component';

describe('NavDetailsMenuComponent', () => {
  let component: NavDetailsMenuComponent;
  let fixture: ComponentFixture<NavDetailsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavDetailsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavDetailsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
