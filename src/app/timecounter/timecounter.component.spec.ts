import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimecounterComponent } from './timecounter.component';

describe('TimecounterComponent', () => {
  let component: TimecounterComponent;
  let fixture: ComponentFixture<TimecounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimecounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimecounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
