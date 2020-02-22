import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FieldComponent } from './field/field.component';
import { BoardComponent } from './board/board.component';
import { ResourcesComponent } from './resources/resources.component';
import { TimecounterComponent } from './timecounter/timecounter.component';
import { BombcounterComponent } from './bombcounter/bombcounter.component';

@NgModule({
  declarations: [
    AppComponent,
    FieldComponent,
    BoardComponent,
    ResourcesComponent,
    TimecounterComponent,
    BombcounterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
