import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maps2',
  templateUrl: './maps2.component.html',
  styleUrls: ['./maps2.component.css']
})
export class Maps2Component implements OnInit {
  private title: string;
  private zoom: number;
  private markers: Marker[];

  constructor() {
    this.title = 'Map api 2';
    this.zoom = 13;
    this.markers  = [
      {
        position: {
          lat: 37.7749295,
          lng: -122.4194155,
        },
        icon: {
          url: 'assets/pin.png',
          anchor: [20, 64],
          size: [40, 64],
          scaledSize: [40, 64]
        },
        draggable: true,
        infoBox: {
          text: 'ovo je info box'
        }
      },
      {
        position: {
          lat: 37.77288579,
          lng: -122.50167847
        },
        infoBox: {
          text: 'ovo je sss'
        }
      }
    ];
  }

  ngOnInit() {
  }

  markerClick($event, val) {
    const marker = $event.target;
    const markerId = val.getAttribute('data-index');
    const id = 'marker-' + markerId;

    // Fire event if element exist
    if ( this.markers[markerId].infoBox !== undefined ) {
      marker.nguiMapComponent.openInfoWindow( id, marker);
    }
  }
}

interface Marker {
  position: MarkerPosition;
  icon?: MarkerIcon;
  draggable?: boolean;
  infoBox?: InfoBox;
}

interface InfoBox {
  text: string;
}

interface MarkerPosition {
  lat: number;
  lng: number;
}

interface MarkerIcon {
  url: string;
  anchor?: Array<number>;
  size?: Array<number>;
  scaledSize?: Array<number>;
}
