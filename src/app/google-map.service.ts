import * as geo from 'nativescript-geolocation';
import { Injectable } from '@angular/core';
import * as GoogleMaps from 'nativescript-google-maps-sdk';
import * as GoogleMapsUtils from 'nativescript-google-maps-utils';
import { Image } from 'ui/image';

@Injectable()
export class GoogleMapService {

  constructor() { }

  addMark(map: GoogleMaps.MapView, latitude: number, longitude: number, icon?: Image) {
    const marker = new GoogleMaps.Marker();
    marker.position = GoogleMaps.Position.positionFromLatLng(latitude, longitude);
    if (icon) {
      marker.icon = icon;
    }
    map.addMarker(marker);
  }

}
