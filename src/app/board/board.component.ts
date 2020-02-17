import {Component, Input, OnInit} from '@angular/core';
import {FieldComponent} from '../field/field.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
  fieldList: FieldComponent[] = [];
  bombCount: number = 10;
  poolBombList: FieldComponent[] = [];
  private allBombsPlanted = false;
  isGameOver = false;

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
      const pool = new FieldComponent();
      pool.poolID = i;
      this.fieldList.push(pool);
    }
  }

  plantTheBombs() {
    const poolCount = this.fieldList.length - 1;
    const poolToPlant = Math.floor((Math.random() * poolCount));
    if (!this.checkIfHasBomb(poolToPlant)) {
      this.poolBombList.push(this.fieldList[poolToPlant]);
      this.fieldList[poolToPlant].isBomb = true;
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
