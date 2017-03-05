import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Accuracy } from 'ui/enums';
import * as geo from 'nativescript-geolocation';

@Component({
  moduleId: module.id,
  selector: 'app-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.css']
})
export class LocationMapComponent implements OnInit, OnDestroy {
  self = this;
  watchLocationId;
  location;

  constructor(private zone: NgZone) { }

  ngOnInit() {
    if (!geo.isEnabled()) {
      geo.enableLocationRequest(false);
    }
    this.startWatchLocation();
  }

  startWatchLocation() {
    const watchOptions = {
      desiredAccuracy: Accuracy.any,
      updateDistance: 0,
      minimumUpdateTime: 1000 * 20
    };

    this.watchLocationId = geo.watchLocation(
      (loc) => this.zone.run(() => { this.handleWatchLocationSuccess(loc); }),
      this.handleWatchLocationError,
      watchOptions);
  }

  handleWatchLocationSuccess(loc) {
    if (loc) {
      this.location = loc;
    }
  }

  handleWatchLocationError(error) {
    console.log('Error: ' + error.message);
  }

  ngOnDestroy() {
    if (this.watchLocationId) {
      geo.clearWatch(this.watchLocationId);
    }
  }
}
