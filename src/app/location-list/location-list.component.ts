import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {

  savedLocations: any[];

  constructor() { }

  ngOnInit() {
    this.savedLocations = [
      { name: 'Location1' },
      { name: 'Location2' },
      { name: 'Location3' }
    ];
  }

  onItemTap($event) {
    console.log(this.savedLocations[$event.index].name);
  }

}
