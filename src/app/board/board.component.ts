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
  fieldBombNeighboorID: number[] = [];
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
    this.createBombNeighbors();
    // this.createInfoBoxes();
    console.log(this.fieldBombNeighboorID);
  }

  createBoardFromPools() {
    let idIterator = 0;
    for (let j = 0; j < this.poolCount; j++) {
      for (let i = 0; i < this.poolCount; i++) {
        const pool = new FieldComponent();
        pool.poolX = i;
        pool.poolY = j;
        pool.poolID = idIterator;
        idIterator++;
        this.fieldList.push(pool);
      }
    }
  }

  createBombNeighbors() {
    for (let i = 0, iMax = this.poolBombList.length; i < iMax; i++) {
      for (let j = 0; j < 4; j++) {
        switch (j) {
          case 0:
            if (this.poolBombList[i].poolX - 1 >= 0 &&
              this.poolBombList[i].poolY - 1 >= 0 &&
              this.fieldBombNeighboorID.indexOf(this.poolBombList[i].poolID) === -1) {
              this.fieldBombNeighboorID.push(this.poolBombList[i].poolID);
            }
            break;

          case 1:
            if (this.poolBombList[i].poolX - 1 >= 0 &&
              this.poolBombList[i].poolY + 1 < this.poolCount &&
              this.fieldBombNeighboorID.indexOf(this.poolBombList[i].poolID) === -1) {
              this.fieldBombNeighboorID.push(this.poolBombList[i].poolID);
            }
            break;

          case 2:
            if (this.poolBombList[i].poolX + 1 < this.poolCount &&
              this.poolBombList[i].poolY - 1 >= 0 &&
              this.fieldBombNeighboorID.indexOf(this.poolBombList[i].poolID) === -1) {
              this.fieldBombNeighboorID.push(this.poolBombList[i].poolID);
            }
            break;

          case 3:
            if (this.poolBombList[i].poolX + 1 < this.poolCount &&
              this.poolBombList[i].poolY + 1 < this.poolCount &&
              this.fieldBombNeighboorID.indexOf(this.poolBombList[i].poolID) === -1) {
              this.fieldBombNeighboorID.push(this.poolBombList[i].poolID);
            }
            break;
        }
      }
    }
  }

  createInfoBoxes() {
    for (let i = 0, iMax = this.poolBombList.length; i < iMax; i++) {
      let bombNeighboorCounter = 0;
      for (let j = 0; j < 4; j++) {
        switch (j) {
          case 0:
            const bombFieldNeighboorX0 = this.poolBombList[i].poolX - 1;
            const bombFieldNeighboorY0 = this.poolBombList[i].poolY - 1;
            if (this.checkIfHasBomb(this.findFieldWithXY(bombFieldNeighboorX0, bombFieldNeighboorY0))) {
              bombNeighboorCounter++;
            }
            break;

          case 1:
            const bombFieldNeighboorX1 = this.poolBombList[i].poolX - 1;
            const bombFieldNeighboorY1 = this.poolBombList[i].poolY - 1;
            if (this.checkIfHasBomb(this.findFieldWithXY(bombFieldNeighboorX1, bombFieldNeighboorY1))) {
              bombNeighboorCounter++;
            }
            break;

          case 2:
            const bombFieldNeighboorX2 = this.poolBombList[i].poolX - 1;
            const bombFieldNeighboorY2 = this.poolBombList[i].poolY - 1;
            if (this.checkIfHasBomb(this.findFieldWithXY(bombFieldNeighboorX2, bombFieldNeighboorY2))) {
              bombNeighboorCounter++;
            }
            break;

          case 3:
            const bombFieldNeighboorX3 = this.poolBombList[i].poolX - 1;
            const bombFieldNeighboorY3 = this.poolBombList[i].poolY - 1;
            if (this.checkIfHasBomb(this.findFieldWithXY(bombFieldNeighboorX3, bombFieldNeighboorY3))) {
              bombNeighboorCounter++;
            }
            break;
        }
      }
    }
    return true;
  }

  findFieldWithXY(x: number, y: number) {
    for (let i = 0, iMax = this.fieldList.length * this.fieldList.length; i < iMax; i++) {
      if (this.fieldList[i].poolX === x && this.fieldList[i].poolY === y) {
        return this.fieldList[i];
      }
    }
  }


  plantTheBombs() {
    const poolCount = this.fieldList.length - 1;
    const poolToPlant = Math.floor((Math.random() * poolCount));
    if (!this.checkIfHasBomb(poolToPlant)) {
      this.poolBombList.push(this.fieldList[poolToPlant]);
      this.fieldList[poolToPlant].setIsBomb();
    }
    if (this.poolBombList.length === this.bombCount) {
      this.allBombsPlanted = true;
    }
  }

  checkIfHasBomb(poolToPlant): boolean {

    for (let i = 0, iMax = this.poolBombList.length; i < iMax; i++) {
      if (this.poolBombList[i].poolX === poolToPlant.poolX &&
        this.poolBombList[i].poolY === poolToPlant.poolY) {
        return true;
      }
    }
    return false;
  }

}
