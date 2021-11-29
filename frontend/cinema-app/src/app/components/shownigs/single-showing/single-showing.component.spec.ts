import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleShowingComponent } from './single-showing.component';

describe('SingleShowingComponent', () => {
  let component: SingleShowingComponent;
  let fixture: ComponentFixture<SingleShowingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleShowingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleShowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
