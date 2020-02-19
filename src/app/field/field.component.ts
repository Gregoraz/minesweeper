import {Component, Input, OnInit} from '@angular/core';
import {style} from '@angular/animations';

@Component({
  selector: 'app-pool',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.sass']
})

export class FieldComponent implements OnInit {
  isClickable = true;
  isMarkedAsBomb = false;
  isExpanded = false;
  isBombExpanded = false;

  @Input() isBomb: boolean;
  @Input() poolX: number;
  @Input() poolY: number;
  @Input() poolID: number;
  @Input() isInfo: boolean;
  @Input() neighbors: number[];
  @Input() touchesBombCount: number;

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
  }

  onRightClick(event: any) {
    event.preventDefault();
    this.isMarkedAsBomb = !this.isMarkedAsBomb;
  }

}
