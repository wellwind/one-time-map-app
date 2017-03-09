import { OneTimeMapService } from './../one-time-map.service';
import { ElementRef, ViewChild, Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Accuracy } from 'ui/enums';
import { Image } from 'ui/image';
import * as ImageSource from 'image-source';
import { Page } from 'ui/page';
import * as Dialogs from 'ui/dialogs';
import * as geo from 'nativescript-geolocation';
import * as GoogleMaps from 'nativescript-google-maps-sdk';
import * as GoogleMapsUtils from 'nativescript-google-maps-utils';
import { Directions } from 'nativescript-directions';
import { registerElement } from 'nativescript-angular/element-registry';
import * as moment from 'moment';
import * as utils from 'utils/utils';

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
  viewMode = 'me';
  caremaLocation: { latitude: number; longitude: number; };

  constructor(private zone: NgZone, private service: OneTimeMapService) { }

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
      this._setCaremaLocation();

      this.map.removeAllMarkers();
      this._addCurrentLocationToMap();
      this._addSelectedLocationToMap();
    }
  }

  private _setCaremaLocation() {
    if (this.hasSelectedLocation() && this.viewMode === 'saved') {
      this.caremaLocation = {
        latitude: this.service.selectedLocation.Latitude,
        longitude: this.service.selectedLocation.Longitude
      };
    } else {
      this.caremaLocation = {
        latitude: this.location.latitude,
        longitude: this.location.longitude
      };
    }
  }

  private _addCurrentLocationToMap() {
    const marker = new GoogleMaps.Marker();
    marker.position = GoogleMaps.Position.positionFromLatLng(this.location.latitude, this.location.longitude);
    this.map.addMarker(marker);
  }

  private _addSelectedLocationToMap() {
    if (this.hasSelectedLocation()) {
      const selectedLocationMarker = new GoogleMaps.Marker();
      selectedLocationMarker.position = GoogleMaps.Position.positionFromLatLng(
        this.service.selectedLocation.Latitude,
        this.service.selectedLocation.Longitude);

      const icon = new Image();
      icon.imageSource = ImageSource.fromResource('map-marker-orange.png');
      selectedLocationMarker.icon = icon;

      this.map.addMarker(selectedLocationMarker);
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

  rememberHere() {
    const options = {
      title: '給這地方一個名稱方便記憶吧',
      defaultText: moment().format('YYYY/MM/DD hh:mm:ss'),
      inputType: Dialogs.inputType.text,
      okButtonText: '儲存',
      cancelButtonText: '取消'
    };
    Dialogs.prompt(options).then((result: Dialogs.PromptResult) => {
      if (result.result) {
        this.service.remberLocation(
          result.text,
          this.location.latitude,
          this.location.longitude);
      }
    });
  }

  hasSelectedLocation() {
    return this.service.selectedLocation !== undefined;
  }

  direction() {
    const directions = new Directions();
    directions.available().then((available) => {
      console.log(available);
      if (available) {
        directions.navigate({
          from: {
            lat: this.location.latitude,
            lng: this.location.longitude
          },
          to: {
            lat: this.service.selectedLocation.Latitude,
            lng: this.service.selectedLocation.Longitude
          }
        });
      } else {
        let directionUrl = `https://www.google.com/maps/dir/`;
        directionUrl = `${directionUrl}/${this.location.latitude},${this.location.longitude}`;
        directionUrl = `${directionUrl}/${this.service.selectedLocation.Latitude},${this.service.selectedLocation.Longitude}`;
        utils.openUrl(directionUrl);
      }
    });
  }
}
