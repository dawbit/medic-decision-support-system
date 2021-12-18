import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalDataBookComponent } from './medicalData-book.component';

describe('MedicalDataBookComponent', () => {
  let component: MedicalDataBookComponent;
  let fixture: ComponentFixture<MedicalDataBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalDataBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalDataBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
