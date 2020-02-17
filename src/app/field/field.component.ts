import {Component, Input, OnInit} from '@angular/core';
import {style} from '@angular/animations';

@Component({
  selector: 'app-pool',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.sass']
})

export class FieldComponent implements OnInit {
  isBomb = false;
  isInfo = false;
  isClickable = true;
  touchesBombCount = 0;
  isMarkedAsBomb = false;
  isExpanded = false;
  poolID: number;

  @Input() display: string;

  constructor() {
  }

  ngOnInit() {
  }

  expandMe() {
    this.isExpanded = !this.isExpanded;
  }

  onFieldClick(event: any) {
    this.expandMe();
    this.isClickable = false;
    console.log(event);
  }

  onRightClick(event: any) {
    event.preventDefault();
    this.isMarkedAsBomb = !this.isMarkedAsBomb;
  }

}
