import {Component, Input, OnInit} from '@angular/core';
import {FieldComponent} from '../field/field.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
  fieldList: FieldComponent[] = [];
  bombCount = 10;
  poolBombList: FieldComponent[] = [];
  fieldBombNeighbor: FieldComponent[] = [];
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
    this.setZerosToEveryField();
    this.createInfoBoxes();
    console.log(this);
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

  setZerosToEveryField() {
    for (let i = 0, iMax = this.fieldList.length; i < iMax; i++) {
      if (!this.fieldList[i].isBomb) {
        this.fieldList[i].touchesBombCount = 0;
      }
    }
  }


  createInfoBoxes() {
    for (let i = 0, iMax = this.fieldList.length; i < iMax; i++) {
      let bombToucherCounter = 0;
      if (this.fieldList[i].poolX - 1 >= 0 &&
        this.fieldList[i].poolY - 1 >= 0) {
        const neighbor0X = this.findFieldWithXY(this.fieldList[i].poolX - 1, this.fieldList[i].poolY - 1);
        if (neighbor0X && neighbor0X.isBomb) {
          bombToucherCounter++;
        }
      }

      if (this.fieldList[i].poolX + 1 < this.poolCount &&
        this.fieldList[i].poolY - 1 >= 0) {
        const neighbor0X = this.findFieldWithXY(this.fieldList[i].poolX + 1, this.fieldList[i].poolY - 1);
        if (neighbor0X && neighbor0X.isBomb) {
          bombToucherCounter++;
        }
      }

      if (this.fieldList[i].poolX - 1 >= 0 &&
        this.fieldList[i].poolY + 1 < this.poolCount) {
        const neighbor0X = this.findFieldWithXY(this.fieldList[i].poolX - 1, this.fieldList[i].poolY + 1);
        if (neighbor0X && neighbor0X.isBomb) {
          bombToucherCounter++;
        }
      }

      if (this.fieldList[i].poolX + 1 < this.poolCount &&
        this.fieldList[i].poolY + 1 < this.poolCount) {
        const neighbor0X = this.findFieldWithXY(this.fieldList[i].poolX + 1, this.fieldList[i].poolY + 1);
        if (neighbor0X && neighbor0X.isBomb) {
          bombToucherCounter++;
        }
      }

      if (this.fieldList[i].poolX + 1 < this.poolCount) {
        const neighbor0X = this.findFieldWithXY(this.fieldList[i].poolX + 1, this.fieldList[i].poolY);
        if (neighbor0X && neighbor0X.isBomb) {
          bombToucherCounter++;
        }
      }

      if (this.fieldList[i].poolX - 1 >= 0) {
        const neighbor0X = this.findFieldWithXY(this.fieldList[i].poolX - 1, this.fieldList[i].poolY);
        if (neighbor0X && neighbor0X.isBomb) {
          bombToucherCounter++;
        }
      }

      if (this.fieldList[i].poolY < this.poolCount) {
        const neighbor0X = this.findFieldWithXY(this.fieldList[i].poolX, this.fieldList[i].poolY + 1);
        if (neighbor0X && neighbor0X.isBomb) {
          bombToucherCounter++;
        }
      }

      if (this.fieldList[i].poolY >= 0) {
        const neighbor0X = this.findFieldWithXY(this.fieldList[i].poolX, this.fieldList[i].poolY - 1);
        if (neighbor0X && neighbor0X.isBomb) {
          bombToucherCounter++;
        }
      }
      if (bombToucherCounter > 0) {
        this.fieldList[i].isInfo = true;
      }
      this.fieldList[i].touchesBombCount = bombToucherCounter;
    }
  }

  findFieldWithXY(x: number, y: number) {
    for (let i = 0, iMax = this.fieldList.length; i < iMax; i++) {
      if (this.fieldList[i] && this.fieldList[i].poolX === x && this.fieldList[i].poolY === y) {
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
