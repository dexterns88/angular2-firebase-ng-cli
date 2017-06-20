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
  private paths: any;
  private polygons: Polygon[];

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

    this.polygons = [
      {
        paths: [
          [
            {
              lat: 37.78563945,
              lng: -122.42082596
            },
            {
              lat: 37.77166458,
              lng: -122.44588852
            },
            {
              lat: 37.79703447,
              lng: -122.46974945
            }
          ]
        ],
        editable: false,
        strokeColor: '#53ff21',
        strokeWeight: 1,
        strokeOpacity: 0.8,
        fillColor: '#37aa1c',
        fillOpacity: 0.4
      },
      {
        paths: [
          [
            {
              lat: 37.80083242,
              lng: -122.42443085
            },
            {
              lat: 37.80503706,
              lng: -122.40245819
            },
            {
              lat: 37.78930232,
              lng: -122.38924026
            },
            {
              lat: 37.780891,
              lng: -122.42031097
            }
          ]
        ],
        editable: false,
        strokeColor: '#1d28ff',
        strokeWeight: 1,
        strokeOpacity: 0.8,
        fillColor: '#00226a',
        fillOpacity: 0.4
      }
    ];

  // constructor end
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

interface Polygon {
  paths: Cord[][];
  strokeColor: string;
  strokeWeight: number;
  editable: boolean;
  strokeOpacity?: number;
  fillColor?: string;
  fillOpacity?: number;
}

interface Cord {
  lat: number;
  lng: number;
}

interface Marker {
  position: MapCord;
  icon?: MarkerIcon;
  draggable?: boolean;
  infoBox?: InfoBox;
}

interface InfoBox {
  text: string;
}

interface MapCord {
  lat: number;
  lng: number;
}

interface MarkerIcon {
  url: string;
  anchor?: Array<number>;
  size?: Array<number>;
  scaledSize?: Array<number>;
}
