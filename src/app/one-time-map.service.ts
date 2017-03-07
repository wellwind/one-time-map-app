import { SavedLocation } from './shared/interfaces/saved-location';
import { NgZone, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import * as localStorage from 'nativescript-localstorage';

@Injectable()
export class OneTimeMapService {
  private _locations: SavedLocation[];
  private _savedLocationSubscriber: any;

  savedLocation: Observable<SavedLocation[]>;

  constructor(private zone: NgZone) {
    this._locations = JSON.parse(localStorage.getItem('locations')) || [];

    this.savedLocation = Observable.create((observable: any) => {
      this._savedLocationSubscriber = observable;
      this._savedLocationSubscriber.next(this._locations);
    });
  }

  remberLocation(name, latitude, longitude) {
    const toAddLocation: SavedLocation = {
      Name: name,
      Latitude: latitude,
      Longitude: longitude
    };
    this._locations.push(toAddLocation);
    localStorage.setItem('locations', JSON.stringify(this._locations));
    this._savedLocationSubscriber.next(this._locations);
  }
}
