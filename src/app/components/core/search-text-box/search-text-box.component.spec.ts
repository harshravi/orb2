import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTextBoxComponent } from './search-text-box.component';

describe('SearchTextBoxComponent', () => {
  let component: SearchTextBoxComponent;
  let fixture: ComponentFixture<SearchTextBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTextBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTextBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
