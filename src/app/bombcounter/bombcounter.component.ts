import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bombcounter',
  templateUrl: './bombcounter.component.html',
  styleUrls: ['./bombcounter.component.sass']
})
export class BombcounterComponent implements OnInit {

  @Input() bombCount: number;

  constructor() {
  }

  ngOnInit() {
  }

}
