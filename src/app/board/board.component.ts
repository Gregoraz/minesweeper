import {Component, Input, OnInit} from '@angular/core';
import {PoolComponent} from '../pool/pool.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
  poolList: PoolComponent[] = [];
  bombCount: number = 10;
  poolBombList: PoolComponent[] = [];
  private allBombsPlanted = false;

  @Input() poolCount: number;

  constructor() {
  }

  ngOnInit() {
    this.createBoardFromPools();
    while (!this.allBombsPlanted) {
      this.plantTheBombs();
    }
    console.log(this);
  }

  createBoardFromPools() {
    for (let i = 0; i < this.poolCount; i++) {
      const pool = new PoolComponent();
      pool.poolID = i;
      this.poolList.push(pool);
    }
  }

  plantTheBombs() {
    const poolCount = this.poolList.length - 1;
    const poolToPlant = Math.floor((Math.random() * poolCount));
    if (!this.checkIfHasBomb(poolToPlant)) {
      this.poolBombList.push(this.poolList[poolToPlant]);
      this.poolList[poolToPlant].isBomb = true;
    }
    if (this.poolBombList.length === this.bombCount) {
      this.allBombsPlanted = true;
    }
  }

  checkIfHasBomb(poolToPlant): boolean {

    for (let i = 0, iMax = this.poolBombList.length; i < iMax; i++) {
      if (this.poolBombList[i].poolID === poolToPlant.poolID) {
        return true;
      }
    }
    return false;
}

}
