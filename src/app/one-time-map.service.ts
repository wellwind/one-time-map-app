import { Observer } from './../platforms/ios/build/emulator/src.app/app/tns_modules/rxjs/Observer.d';
import { SavedLocation } from './shared/interfaces/saved-location';
import { NgZone, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import * as localStorage from 'nativescript-localstorage';

@Injectable()
export class OneTimeMapService {
  private _locations: SavedLocation[];
  private _savedLocationSubscriber: any;

  selectedLocation: SavedLocation;
  savedLocation: Observable<SavedLocation[]>;

  constructor(private zone: NgZone) {
    this._locations = JSON.parse(localStorage.getItem('locations')) || [];

    this.savedLocation = Observable.create((observable: Observer<Location[]>) => {
      this._savedLocationSubscriber = observable;
      this._savedLocationSubscriber.next(this._locations);
    });
  }

  _saveLocations() {
    localStorage.setItem('locations', JSON.stringify(this._locations));
  }

  _notifyLocations() {
    this._savedLocationSubscriber.next(this._locations);
  }

  remberLocation(name, latitude, longitude) {
    const toAddLocation: SavedLocation = {
      Name: name,
      Latitude: latitude,
      Longitude: longitude
    };
    this._locations.push(toAddLocation);
    this._saveLocations();
    this._notifyLocations();
  }

  selectLocation(index) {
    this.selectedLocation = this._locations[index];
  }

  deleteLocation(index) {
    const item = this._locations[index];
    this._locations.splice(this._locations.indexOf(item), 1);
    this._saveLocations();
    this._notifyLocations();
  }
}
