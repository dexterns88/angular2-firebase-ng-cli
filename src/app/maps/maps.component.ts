import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  title: string;
  lat: number;
  lng: number;
  zoom: number;
  markers: Marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.663858,
      lng: 7.823982,
      label: 'B',
      draggable: false
    }
  ];

  constructor() {
    this.title = 'Google maps api';
    this.lat = 51.678418;
    this.lng = 7.809007;
    this.zoom = 13;
  }

  ngOnInit() {
  }

  mapClicked($event) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng
    });
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

}

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
}
