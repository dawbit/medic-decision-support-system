import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowingsAddComponent } from './showings-add.component';

describe('ShowingsAddComponent', () => {
  let component: ShowingsAddComponent;
  let fixture: ComponentFixture<ShowingsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowingsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowingsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
