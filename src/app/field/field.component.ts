import {Component, Input, OnInit, EventEmitter, Output, OnChanges, SimpleChange} from '@angular/core';
import {style} from '@angular/animations';

@Component({
  selector: 'app-pool',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.sass']
})

export class FieldComponent implements OnInit, OnChanges {
  isClickable = true;
  isMarkedAsBomb = false;
  isExpanded = false;
  isBombExpanded = false;
  comesFromClick: boolean;

  @Output() exposedField = new EventEmitter<FieldComponent>();

  @Input() isBomb: boolean;
  @Input() poolX: number;
  @Input() poolY: number;
  @Input() poolID: number;
  @Input() isInfo: boolean;
  @Input() neighbors: number[];
  @Input() touchesBombCount: number;
  @Input() isGameOver: boolean;

  @Input() isReadyToExpand: boolean;
  ngOnChanges() {
    console.log('THERE IS A CHANGE');

    if (this.isReadyToExpand) {
      this.expandMe();
    }
  }

  constructor() {
  }


  setIsBomb() {
    this.isBomb = true;
  }

  ngOnInit() {
  }


  expandMe() {
    this.isExpanded = !this.isExpanded;
    if (this.isBomb && this.isExpanded) {
      this.isBombExpanded = !this.isBombExpanded;
    }
  }

  onFieldClick(event: any) {
    this.expandMe();
    this.isClickable = false;
    this.comesFromClick = true;
    this.exposedField.emit(this);
  }

  onRightClick(event: any) {
    event.preventDefault();
    this.isMarkedAsBomb = !this.isMarkedAsBomb;
  }

}
