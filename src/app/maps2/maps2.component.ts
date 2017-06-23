import { Component, OnInit, ViewChild } from '@angular/core';
import { DrawingManager } from '@ngui/map'
import {log} from "util";

@Component({
  selector: 'app-maps2',
  templateUrl: './maps2.component.html',
  styleUrls: ['./maps2.component.css'],
  providers: [DrawingManager]
})
export class Maps2Component implements OnInit {

  @ViewChild(DrawingManager) drawingManager: DrawingManager;

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
  private drawingIndex: number;
  private drawingObjects: any;

  private selectedOverlay: any;
  //
  // Element constructor
  constructor() {
    this.action = false;
    this.btnMarkerIsActive = false;
    this.btnPolygonRemove = false;
    this.title = 'Map api 2';
    this.zoom = 13;

    this.drawingIndex = 0;
    this.drawingObjects = [];

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

    // this.polygons = [
    //   {
    //     paths: [
    //       [
    //         {
    //           lat: 37.78563945,
    //           lng: -122.42082596
    //         },
    //         {
    //           lat: 37.77166458,
    //           lng: -122.44588852
    //         },
    //         {
    //           lat: 37.79703447,
    //           lng: -122.46974945
    //         }
    //       ],
    //       [
    //         {
    //           lat: 37.79510151,
    //           lng: -122.46700287
    //         },
    //         {
    //           lat: 37.77736339,
    //           lng: -122.44588852
    //         },
    //         {
    //           lat: 37.78428278,
    //           lng: -122.43610382,
    //         },
    //       ]
    //     ],
    //     editable: false,
    //     strokeColor: '#53ff21',
    //     strokeWeight: 1,
    //     strokeOpacity: 0.8,
    //     fillColor: '#37aa1c',
    //     fillOpacity: 0.4
    //   }
    // ];

    // let toStorage = JSON.stringify( this.polygons );
    // localStorage.setItem( 'map-polygons', toStorage );
    // Get polygons from local storage
    this.polygons = JSON.parse( localStorage.getItem('map-polygons') );


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

    const _this = this;

    this.drawingManager['initialized$'].subscribe(function (dm) {
      google.maps.event.addListener(dm, 'overlaycomplete', function(event) {

        // if not MARKER
        if (event.type !== google.maps.drawing.OverlayType.MARKER) {
          dm.setDrawingMode(null);
          google.maps.event.addListener(event.overlay, 'click', function(e) {
            _this.selectedOverlay = event.overlay;
            _this.selectedOverlay.setEditable(true);
          });

          // console.log( event.overlay );

          if ( event.type === 'polygon') {
            const path = event.overlay.getPath(),
                  pathArray = path.getArray();

            // console.log( event );
            // console.log( event.overlay );

            _this.addPolygon( event );

            google.maps.event.addListener(path, 'insert_at', function() {
              console.log( 'insert at' );
              // console.log( event );

              _this.addPolygon( event );
              // console.log( this.getArray() );
            });

            google.maps.event.addListener(path, 'remove_at', function() {
              console.log( 'remove at' );
              console.log( event );
              // console.log( this );
            });

            google.maps.event.addListener(path, 'set_at', function() {
              console.log( 'set at' );
              console.log( event );
              // console.log( this.getArray() );
            });
          }

          // insert_at
          // remove_at
          // set_at


        }
      });
    });
  }

  // Function to save drawing to local storage
  saveDrawing() {
    console.log( 'local storage it' );

    for (let i = 0; i < this.drawingObjects.length; i++) {
      let drawObj = this.drawingObjects[i];

      if (drawObj.type === 'polygon') {
        // let tmpPolygon = {
        //   paths: [
        //       [
        //         {
        //           lat: 37.78563945,
        //           lng: -122.42082596
        //         },
        //         {
        //           lat: 37.77166458,
        //           lng: -122.44588852
        //         },
        //         {
        //           lat: 37.79703447,
        //           lng: -122.46974945
        //         }
        //       ],
        //       [
        //         {
        //           lat: 37.79510151,
        //           lng: -122.46700287
        //         },
        //         {
        //           lat: 37.77736339,
        //           lng: -122.44588852
        //         },
        //         {
        //           lat: 37.78428278,
        //           lng: -122.43610382,
        //         },
        //       ]
        //     ],
        //     editable: false,
        //     strokeColor: '#ff2848',
        //     strokeWeight: 1,
        //     strokeOpacity: 0.8,
        //     fillColor: '#4f37aa',
        //     fillOpacity: 0.4
        // }
        console.log( drawObj.overlay.getPaths().getArray() );

      }
      console.log( drawObj );
    }

    // this.polygons.push({
    //   paths: [
    //     [
    //       {
    //         lat: 37.78563945,
    //         lng: -122.42082596
    //       },
    //       {
    //         lat: 37.77166458,
    //         lng: -122.44588852
    //       },
    //       {
    //         lat: 37.79703447,
    //         lng: -122.46974945
    //       }
    //     ],
    //     [
    //       {
    //         lat: 37.79510151,
    //         lng: -122.46700287
    //       },
    //       {
    //         lat: 37.77736339,
    //         lng: -122.44588852
    //       },
    //       {
    //         lat: 37.78428278,
    //         lng: -122.43610382,
    //       },
    //     ]
    //   ],
    //   editable: false,
    //   strokeColor: '#ff2848',
    //   strokeWeight: 1,
    //   strokeOpacity: 0.8,
    //   fillColor: '#4f37aa',
    //   fillOpacity: 0.4
    // });

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

  // create add function for object
  addPolygon(object) {
    let objectIndex;

    if ( typeof(object.index) === 'undefined' ) {
      objectIndex = this.drawingIndex;
      this.drawingIndex++;
      object['index'] = objectIndex;
    } else {
      objectIndex = object.index;
    }

    // if object is undefined hide it
    if ( typeof( this.drawingObjects[objectIndex] ) === 'undefined' ) {
      this.drawingObjects.push( object );
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
