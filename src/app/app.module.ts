import { GoogleMapService } from './google-map.service';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationMapComponent } from './location-map/location-map.component';
import { OneTimeMapService } from './one-time-map.service';

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
    LocationListComponent,
    LocationMapComponent
  ],
  providers: [
    OneTimeMapService,
    GoogleMapService
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
