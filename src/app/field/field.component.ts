import {Component, Input, OnInit, EventEmitter, Output, OnChanges} from '@angular/core';
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
  @Output() isFlagged = new EventEmitter<FieldComponent>();
  @Output() gameHasStarted = new EventEmitter<boolean>();

  @Input() isBomb: boolean;
  @Input() poolX: number;
  @Input() poolY: number;
  @Input() poolID: number;
  @Input() isInfo: boolean;
  @Input() neighbors: number[];
  @Input() touchesBombCount: number;
  @Input() isGameOver: boolean;
  @Input() isWinner: boolean;
  @Input() allFieldsMarked: boolean;

  @Input() isReadyToExpand: boolean;

  ngOnChanges() {
    if (this.isReadyToExpand) {
      this.expandMe();
    }
    if (this.isGameOver || this.isWinner) {
      this.gameHasStarted.emit(false);
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
    if (!this.gameHasStarted) {
      this.gameHasStarted.emit(true);
    }
    this.expandMe();
    this.isClickable = false;
    this.comesFromClick = true;
    this.exposedField.emit(this);
  }

  onRightClick(event: any) {
    event.preventDefault();
    if (!this.gameHasStarted) {
      this.gameHasStarted.emit(true);
    }
    if (!this.allFieldsMarked) {
      this.isMarkedAsBomb = !this.isMarkedAsBomb;
      this.isFlagged.emit(this);
    } else {
      if (this.isMarkedAsBomb) {
        this.isMarkedAsBomb = false;
        this.isFlagged.emit(this);
      }
    }
  }
}
