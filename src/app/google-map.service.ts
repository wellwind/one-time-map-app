import * as geo from 'nativescript-geolocation';
import { Injectable } from '@angular/core';
import * as GoogleMaps from 'nativescript-google-maps-sdk';
import * as GoogleMapsUtils from 'nativescript-google-maps-utils';
import { Image } from 'ui/image';
import { Directions } from 'nativescript-directions';
import * as utils from 'utils/utils';

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

  direction(from: { latitude: number; longitude: number }, to: { latitude: number; longitude: number }) {
    const directions = new Directions();
    directions.available().then((available) => {
      console.log(available);
      if (available) {
        directions.navigate({
          from: {
            lat: from.latitude,
            lng: from.longitude
          },
          to: {
            lat: to.latitude,
            lng: to.longitude
          }
        });
      } else {
        let directionUrl = `https://www.google.com/maps/dir/`;
        directionUrl = `${directionUrl}/${from.latitude},${from.longitude}`;
        directionUrl = `${directionUrl}/${to.latitude},${to.longitude}`;
        utils.openUrl(directionUrl);
      }
    });
  }
}
