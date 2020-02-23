import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-timecounter',
  templateUrl: './timecounter.component.html',
  styleUrls: ['./timecounter.component.sass']
})
export class TimecounterComponent implements OnInit, OnChanges {
  timeCounter: number;
  timeDisplay: string;
  timeInterval: number;

  @Input() gameIsRunning: boolean;

  constructor() {
  }

  getCurrentTimeDisplay() {
    return this.timeDisplay;
  }

  ngOnInit() {
    this.timeCounter = 1;
    this.timeDisplay = '000000';
  }

  getNumberWithLeading0 = (current, size) => {
    let s = String(current);
    while (s.length < (size || 2)) {
      s = '0' + s;
    }
    return s;
  };

  startTimer() {
    this.updateTimeCounter();
    this.timeInterval = setInterval(this.updateTimeCounter, 1000);
  }

  stopTimer() {
    clearInterval(this.timeInterval);
  }

  resetTimer() {
    this.timeCounter = 0;
    this.timeDisplay = '000000';
  }

  updateTimeCounter = () => {
    if (this.timeCounter === 999999) {
      this.resetTimer();
    } else {
      this.timeCounter++;
      this.timeDisplay = this.getNumberWithLeading0(this.timeCounter, 6);
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.gameIsRunning.currentValue) {
      this.resetTimer();
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }
}
