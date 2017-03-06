import { SavedLocation } from './../shared/interfaces/saved-location';
import { OneTimeMapService } from './../one-time-map.service';
import { ChangeDetectionStrategy, Component, OnInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LocationListComponent implements OnInit {

  savedLocations: Observable<SavedLocation[]>;

  constructor(private service: OneTimeMapService, private zone: NgZone) { }

  ngOnInit() {
    this.savedLocations = this.service.savedLocation;
  }

  onItemTap($event) {
    console.log(this.savedLocations[$event.index].Name);
  }
}
