import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  private allBombsPlanted = false;
  isGameOver = false;
  isWinner = false;
  isReadyToReset = false;
  isMarkedAsBombCounter: number;
  allFieldMarked = false;

  @Input() poolCount: number;
  @Output() bombCountOutput = new EventEmitter<number>();
  @Output() isGamePlay = new EventEmitter<boolean>();
  @Output() gameHasStarted = new EventEmitter<boolean>();

  directions = [
    {
      x: -1,
      y: -1
    },
    {
      x: -1,
      y: 1
    },
    {
      x: 1,
      y: -1
    },
    {
      x: 1,
      y: 1
    },
    {
      x: -1,
      y: 0
    },
    {
      x: 1,
      y: 0
    },
    {
      x: 0,
      y: -1
    },
    {
      x: 0,
      y: 1
    },
  ];

  ngOnInit() {
    this.isMarkedAsBombCounter = 0;
    this.createBoardFromPools();
    this.plantTheBombs();
    this.setZerosToEveryField();
    this.createInfoBoxes();
  }

  resetGame($event) {
    if (!this.isReadyToReset) {
      this.isReadyToReset = true;
    } else {
      this.isReadyToReset = false;
      $event.preventDefault();
      this.fieldList = [];
      this.poolBombList = [];
      this.allBombsPlanted = false;
      this.createBoardFromPools();
      this.plantTheBombs();
      this.setZerosToEveryField();
      this.createInfoBoxes();
      this.isWinner = false;
      this.isGameOver = false;
      this.isMarkedAsBombCounter = 0;
      this.allFieldMarked = false;
      this.bombCountOutput.emit(this.bombCount);
    }
  }

  gameHasStartedEvent($event) {
    this.gameHasStarted.emit($event);
  }

  countExpandedFields() {
    let expandedCounter = 0;
    for (let i = 0, iMax = this.fieldList.length; i < iMax; i++) {
      if (this.fieldList[i].isExpanded) {
        expandedCounter++;
      }
    }
    return expandedCounter;
  }

  increaseMarkedAsBomb(triggerChanges: boolean): void {
    this.isMarkedAsBombCounter++;
    if (triggerChanges) {
      this.bombCountOutput.emit(this.bombCount - this.isMarkedAsBombCounter);
    }
  }

  decreaseMarkedAsBomb(triggerChanges: boolean): void {
    this.isMarkedAsBombCounter--;
    if (triggerChanges) {
      this.bombCountOutput.emit(this.bombCount - this.isMarkedAsBombCounter);
    }
  }


  isFlaggedEvent(field: FieldComponent) {
    if (field.isMarkedAsBomb) {
      this.fieldList[field.poolID].isMarkedAsBomb = true;
      this.increaseMarkedAsBomb(true);
      if (this.isMarkedAsBombCounter === this.bombCount) {
        this.allFieldMarked = true;
        const expandedFieldCount = this.countExpandedFields();
        if (expandedFieldCount === this.fieldList.length - this.bombCount) {
          this.isWinner = true;
        }
      }
    } else {
      this.fieldList[field.poolID].isMarkedAsBomb = false;
      this.decreaseMarkedAsBomb(true);
      this.allFieldMarked = false;
    }
  }

  exposedFieldEvent(field: FieldComponent) {
    if (this.checkIfHasBomb(field)) {
      if (field.comesFromClick) {
        this.isGameOver = true;
      }
    } else {
      this.exposeNeighbors(field);
    }
    if (field.isExpanded) {
      this.fieldList[field.poolID].expandMe();
      const expandedFieldCount = this.countExpandedFields();
      if (expandedFieldCount === this.fieldList.length - this.bombCount && this.allFieldMarked) {
        this.isWinner = true;
      }
    }
  }

  exposeNeighbors(exposedNeighbor: FieldComponent) {
    let neighborIsBomb = 0;
    let neighborIsInfo = 0;

    const goThroughDirections = (j) => {
      if (this.fieldList[exposedNeighbor.poolID].poolX + this.directions[j].x >= 0 &&
        this.fieldList[exposedNeighbor.poolID].poolY + this.directions[j].y >= 0 &&
        this.fieldList[exposedNeighbor.poolID].poolX + this.directions[j].x <= this.poolCount &&
        this.fieldList[exposedNeighbor.poolID].poolY + this.directions[j].y <= this.poolCount
      ) {
        let neighbor0X = this.findFieldWithXY(this.fieldList[exposedNeighbor.poolID].poolX + this.directions[j].x,
          this.fieldList[exposedNeighbor.poolID].poolY + this.directions[j].y);
        if (neighbor0X && !neighbor0X.isBomb && !neighbor0X.isExpanded && !neighbor0X.isMarkedAsBomb) {
          this.fieldList[neighbor0X.poolID].expandMe();
          this.fieldList[neighbor0X.poolID].isReadyToExpand = true;
          const expandedFieldCount = this.countExpandedFields();
          if (expandedFieldCount === this.fieldList.length - this.bombCount && this.allFieldMarked) {
            this.isWinner = true;
          }

          neighbor0X = this.findFieldWithXY(this.fieldList[neighbor0X.poolID].poolX, this.fieldList[neighbor0X.poolID].poolY);

          if (!neighbor0X.isInfo) {
            if (neighbor0X.touchesBombCount === 0) {
              this.exposeNeighbors(neighbor0X);
            }
            neighborIsInfo++;
          }
        } else {
          neighborIsBomb++;
        }
      }
      if (j > 0) {
        goThroughDirections(j - 1);
      }
    };
    goThroughDirections(this.directions.length - 1);
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
        pool.isReadyToExpand = false;
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
      for (let j = 0, jMax = this.directions.length; j < jMax; j++) {
        if (this.fieldList[i].poolX + this.directions[j].x >= 0 &&
          this.fieldList[i].poolY + this.directions[j].y >= 0 &&
          this.fieldList[i].poolY + this.directions[j].x <= this.poolCount &&
          this.fieldList[i].poolY + this.directions[j].y <= this.poolCount
        ) {
          const neighbor0X = this.findFieldWithXY(this.fieldList[i].poolX + this.directions[j].x,
            this.fieldList[i].poolY + this.directions[j].y);

          if (neighbor0X && neighbor0X.isBomb) {
            bombToucherCounter++;
          }
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

    for (let i = 0, iMax = this.bombCount; i < iMax;) {
      const poolToPlantID = Math.floor((Math.random() * poolCount));
      const foundPool = this.fieldList[poolToPlantID];
      if (!this.checkIfHasBomb(foundPool)) {
        this.poolBombList.push(this.fieldList[poolToPlantID]);
        this.fieldList[poolToPlantID].setIsBomb();
        i++;
      }
    }
    this.allBombsPlanted = true;
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
