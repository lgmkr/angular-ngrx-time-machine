import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { clock, people } from './reducers';
import { AppComponent } from './app.component';
import { ClockComponent } from './clock/clock.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ clock, people }),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    })
  ],
  providers: [
    // provideStore({clock})
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
