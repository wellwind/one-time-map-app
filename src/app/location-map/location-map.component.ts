import { ElementRef, ViewChild, Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Accuracy } from 'ui/enums';
import * as geo from 'nativescript-geolocation';
import * as GoogleMaps from 'nativescript-google-maps-sdk';
import * as GoogleMapsUtils from 'nativescript-google-maps-utils';
import { Page } from 'ui/page';
import { registerElement } from 'nativescript-angular/element-registry';

registerElement('MapView', () => require('nativescript-google-maps-sdk').MapView);

@Component({
  moduleId: module.id,
  selector: 'app-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.css']
})
export class LocationMapComponent implements OnInit, OnDestroy {
  self = this;
  watchLocationId;
  location: geo.Location;
  map: GoogleMaps.MapView;

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

      const marker = new GoogleMaps.Marker();
      marker.position = GoogleMaps.Position.positionFromLatLng(this.location.latitude, this.location.longitude);
      this.map.removeAllMarkers();
      this.map.addMarker(marker);
    }
  }

  handleWatchLocationError(error) {
    console.log('Error: ' + error.message);
  }

  onMapReady($event) {
    this.map = $event.object;
  };

  ngOnDestroy() {
    if (this.watchLocationId) {
      geo.clearWatch(this.watchLocationId);
    }
  }
}
