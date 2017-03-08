import { SavedLocation } from './../platforms/ios/src/app/shared/interfaces/saved-location';
import { Observer } from './../platforms/ios/build/emulator/src.app/app/tns_modules/rxjs/Observer.d';
import { NgZone, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import * as localStorage from 'nativescript-localstorage';
import * as moment from 'moment';
import * as _ from 'lodash';

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
      this._notifyLocations();
    });
  }

  _saveLocations() {
    localStorage.setItem('locations', JSON.stringify(this._locations));
  }

  _notifyLocations() {
    this._locations = _.orderBy(this._locations, ['Date'], ['desc']);
    this._locations = _.take(this._locations, 10);
    this._savedLocationSubscriber.next(this._locations);
  }

  remberLocation(name, latitude, longitude) {
    const toAddLocation: SavedLocation = {
      Date: moment().format('YYYY/MM/DD hh:mm:ss'),
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
    this._locations = this._locations.filter(item => item.Date !== this._locations[index].Date);
    this._saveLocations();
    this._notifyLocations();
  }
}
