import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { IAppState, rootReducer, INITIAL_STATE } from './store';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { TodoOverviewComponent } from './todo-overview/todo-overview.component';
import { CustomAsyncPipe } from './custom-async.pipe';
import { CovidComponent } from './covid/covid.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoOverviewComponent,
    CustomAsyncPipe,
    CovidComponent
  ],
  imports: [
    BrowserModule,
    NgReduxModule,
    FormsModule,
    HttpClientModule,
    Ng2SmartTableModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
