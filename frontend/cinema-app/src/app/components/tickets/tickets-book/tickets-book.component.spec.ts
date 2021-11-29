import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsBookComponent } from './tickets-book.component';

describe('TicketsBookComponent', () => {
  let component: TicketsBookComponent;
  let fixture: ComponentFixture<TicketsBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
