import {Component, Input, OnInit} from '@angular/core';
import {style} from '@angular/animations';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.sass']
})

export class PoolComponent implements OnInit {
  isBomb = false;
  isInfo = false;
  isClickable = true;
  touchesBombCount = 0;
  isMarkedAsBomb = false;
  isExpanded = false;
  poolID: number;

  @Input() display: string;

  constructor() {}

  ngOnInit() {
  }

  expandMe() {
    this.isExpanded = !this.isExpanded;
  }

  onPoolClick(event: any) {
    this.expandMe();
    console.log(event);
  }

}
