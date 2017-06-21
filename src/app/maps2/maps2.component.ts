import { Component, OnInit } from '@angular/core';
import { DrawingManager, NguiMapComponent } from '@ngui/map'

@Component({
  selector: 'app-maps2',
  templateUrl: './maps2.component.html',
  styleUrls: ['./maps2.component.css'],
  providers: [DrawingManager, NguiMapComponent]
})
export class Maps2Component implements OnInit {
  private title: string;
  private zoom: number;
  private markers: Marker[];
  private paths: any;
  private polygons: Polygon[];
  private polylines: Polyline[];
  private infoBoxContent: any;
  private action: boolean;

  private alert: Alert;

  // field collection
  private field: InputAction;
  // Flag buttons
  private btnMarkerIsActive: boolean;
  private btnPolygonRemove: boolean;
  private btnDrawing: boolean;

  private selectedOverlay: any;
  //
  // Element constructor
  constructor(private mapDM: DrawingManager) {
    this.action = false;
    this.btnMarkerIsActive = false;
    this.btnPolygonRemove = false;
    this.btnDrawing = false;
    this.title = 'Map api 2';
    this.zoom = 13;

    // Define empty alert
    this.alert = {
      success: false,
      info: false,
      error: false
    };

    // Define field pattern
    this.field = {
      fieldInfoboxContent: ''
    };

    this.markers = [
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
          text: '<h1>ovo je info box</h1>'
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
          ],
          [
            {
              lat: 37.79510151,
              lng: -122.46700287
            },
            {
              lat: 37.77736339,
              lng: -122.44588852
            },
            {
              lat: 37.78428278,
              lng: -122.43610382,
            },
          ]
        ],
        editable: false,
        strokeColor: '#53ff21',
        strokeWeight: 1,
        strokeOpacity: 0.8,
        fillColor: '#37aa1c',
        fillOpacity: 0.4
      }
    ];

    this.polylines = [
      {
        paths: [
          {
            lat: 37.772,
            lng: -122.214
          },
          {
            lat: 21.291,
            lng: -157.821
          },
          {
            lat: -18.142,
            lng: 178.431
          },
          {
            lat: -27.467,
            lng: 153.027
          }
        ],
        strokeColor: '#d00500',
        strokeWeight: 2,
        editable: true,
        geodesic: true
      }
    ]

  // constructor end
  }

  ngOnInit() {

    console.log( 'test' );

    const _this = this;

    this.mapDM['initialized$'].subscribe(function (dm) {
      console.log('s');
      google.maps.event.addListener(dm, 'overlaycomplete', function(event) {
        if (event.type !== google.maps.drawing.OverlayType.MARKER) {
          dm.setDrawingMode(null);
          google.maps.event.addListener(event.overlay, 'click', function(e) {
            _this.selectedOverlay = event.overlay;
            _this.selectedOverlay.setEditable(true);
            console.log( event.overlay );
          });
          _this.selectedOverlay = event.overlay;
        }
      });
    });
  }

  // Reset all button state to default
  buttonStateReset(el) {

    if ( el !== 'marker' ) {
      this.btnMarkerIsActive = false;
    }

    if ( el !== 'polygonRemove' ) {
      this.btnPolygonRemove = false;
    }

  }

  setAction(action) {
    this.buttonStateReset(action);

    if ( action === 'marker' ) {
      this.btnMarkerIsActive = !this.btnMarkerIsActive;
    } else if ( action === 'polygonRemove' ) {
      this.btnPolygonRemove = !this.btnPolygonRemove;
    } else if ( action === 'drawing') {
      this.btnDrawing = !this.btnDrawing;
    }
  }

  // Catch event on polygon
  polygonEvent(event, val) {

    if (this.btnPolygonRemove) {
      // Get item index from element
      const index = val.getAttribute('data-index');
      // Remove item from array
      this.polygons.splice(index, 1);
    }
  }

  // Event on map click
  mapEvent(event) {

    if ( event instanceof MouseEvent ) {
      return;
    }

    if ( this.btnMarkerIsActive ) {
      let info = null;
      /*
       | position: MapCord;
       | icon?: MarkerIcon;
       | draggable?: boolean;
       | infoBox?: InfoBox;
       */
      if ( this.field.fieldInfoboxContent.trim() ) {
        info = { text: this.field.fieldInfoboxContent.trim() };
        this.field.fieldInfoboxContent = '';
      }

      this.markers.push({
        position: event.latLng,
        icon: {
          url: 'assets/pin.png',
          anchor: [20, 64],
          size: [40, 64],
          scaledSize: [40, 64]
        },
        draggable: true,
        infoBox: info
      });

      this.alert.success = 'Marker added to map';

    }
  }
  
  markerClick($event, val) {

    const infoBox = JSON.parse( val.getAttribute('data-popup') );

    // exit if infoBox doesn't exist for selected marker
    if ( infoBox == null ) {
      return;
    }

    const marker = $event.target;
    // pass infoBox content to template
    this.infoBoxContent = infoBox.text;

    setTimeout(function() {
      marker.nguiMapComponent.openInfoWindow('info-popup', marker);
    }, 20);
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

interface Polyline {
  paths: Cord[];
  editable: boolean;
  geodesic: boolean;
  strokeColor: string;
  strokeOpacity?: number;
  strokeWeight?: number;
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

interface InputAction {
  fieldInfoboxContent: any;
}

interface Alert {
  success: any;
  info: any;
  error: any;
}
