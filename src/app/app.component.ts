import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit{
  title = 'Saper';
  bombCount: number;

  ngOnInit() {
    this.bombCount = 10;
  }

  updateBombCount($event) {
    this.bombCount = $event;
  }

  gameHasStarted($event) {
    console.log('game has started!');
  }
}
