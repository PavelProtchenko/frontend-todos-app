import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { ScrollingModule} from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { TodosSearchFilterPipe } from './shared/todos-search-filter.pipe';
import { DefaultComponent } from './layouts/default/default.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    UsersComponent,
    TodosSearchFilterPipe,
    DefaultComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    GoogleMapsModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
