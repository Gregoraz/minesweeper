import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BombcounterComponent } from './bombcounter.component';

describe('BombcounterComponent', () => {
  let component: BombcounterComponent;
  let fixture: ComponentFixture<BombcounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BombcounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BombcounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
