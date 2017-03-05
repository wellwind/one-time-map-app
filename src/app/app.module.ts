import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LocationListComponent } from './location-list/location-list.component';

@NgModule({
  bootstrap: [
    AppComponent
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    MainComponent,
    LocationListComponent
  ],
  providers: [
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
