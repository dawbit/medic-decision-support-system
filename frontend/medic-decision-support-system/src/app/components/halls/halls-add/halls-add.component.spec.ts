/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HallsAddComponent } from './halls-add.component';

describe('HallsAddComponent', () => {
  let component: HallsAddComponent;
  let fixture: ComponentFixture<HallsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HallsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HallsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
