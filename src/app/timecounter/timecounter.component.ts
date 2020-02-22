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

  startTimer() {
    this.timeInterval = setInterval(this.updateTimeCounter, 1000);
  }

  stopTimer() {
    clearInterval(this.timeInterval);
  }

  resetTimer() {
    this.timeCounter = 1;
    this.timeDisplay = '000000';
  }

  updateTimeCounter() {
    this.timeCounter++;
    if (this.timeDisplay === '000000') {
      this.timeDisplay = '111111';
    } else {
      this.timeDisplay = '000000';
    }
    console.log(this.timeDisplay);
    console.log(this.timeCounter);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.gameIsRunning.currentValue) {
      this.resetTimer();
      this.startTimer();
      console.log('Game is running, ', changes.gameIsRunning.currentValue);
    } else {
      this.stopTimer();
      console.log('Game is running, ', changes.gameIsRunning.currentValue);
    }
  }


}
