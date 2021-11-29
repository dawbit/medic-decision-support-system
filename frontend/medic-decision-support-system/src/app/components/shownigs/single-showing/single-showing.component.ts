import { Showing } from './../../../interfaces/Showing';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-single-showing',
  templateUrl: './single-showing.component.html',
  styleUrls: ['./single-showing.component.scss']
})
export class SingleShowingComponent implements OnInit {

  @Input() showing: Showing;
  @Output() newShowingEvent = new EventEmitter<Showing>();
  constructor() { }

  ngOnInit(): void {
  }

  chooseShowing(showing: Showing){
    this.newShowingEvent.emit(showing);
  }

}
