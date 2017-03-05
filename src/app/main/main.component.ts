import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

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
