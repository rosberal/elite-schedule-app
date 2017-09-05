import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';
 import { Component } from '@angular/core';
import { Platform,IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: GoogleMap;
  mapElement: HTMLElement;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public platform: Platform,
    private googleMaps: GoogleMaps
  ) {
    // Wait the native plugin is ready.
    platform.ready().then(() => {
      this.loadMap();
    });
  }
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad MapPage');
  // }

  loadMap() {
    this.mapElement = document.getElementById('map');

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

  }

}
