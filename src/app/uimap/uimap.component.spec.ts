import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UIMapComponent } from './uimap.component';

describe('UIMapComponent', () => {
  let component: UIMapComponent;
  let fixture: ComponentFixture<UIMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UIMapComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UIMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
