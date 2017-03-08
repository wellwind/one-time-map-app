import { SavedLocation } from './../shared/interfaces/saved-location';
import { OneTimeMapService } from './../one-time-map.service';
import { ChangeDetectionStrategy, Component, OnInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as dialogs from 'ui/dialogs';


@Component({
  moduleId: module.id,
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LocationListComponent implements OnInit {

  savedLocations: Observable<SavedLocation[]>;
  _savedLocations: SavedLocation[];
  constructor(private service: OneTimeMapService, private zone: NgZone) { }

  ngOnInit() {
    this.savedLocations = this.service.savedLocation;
    this.savedLocations.subscribe(locations => {
      this._savedLocations = locations;
    });
  }

  onItemTap($event) {
    dialogs.action(this._savedLocations[$event.index].Name, '取消', ['顯示', '刪除']).then(result => {
      if (result === '顯示') {
        this.service.selectLocation($event.index);
      } else if (result === '刪除') {
        this.service.deleteLocation($event.index);
      }
    });

  }
}
