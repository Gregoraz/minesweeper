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
  @Input() isProcessing: boolean;

  @Input() isReadyToExpand: boolean;
  ngOnChanges() {
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
    this.isExpanded = true;
    this.isClickable = false;
    if (this.isBomb && this.isExpanded) {
      this.isBombExpanded = true;
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
