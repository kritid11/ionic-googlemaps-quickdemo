import { Component } from '@angular/core';
import {
  NavController,
  Platform,
  ToastController
} from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapsAnimation,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  mapReady: boolean = false;
  map: GoogleMap;

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public toastCtrl: ToastController,
    private googleMaps: GoogleMaps) {
  }

  ionViewDidLoad() {
    setTimeout(this.loadMap.bind(this), 1000);
  }

  loadMap() {
    // Create a map after the view is ready and the native platform is ready.
    this.map = this.googleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 43.0741704,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    });

    // Wait the maps plugin is ready until the MAP_READY event
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.mapReady = true;
      this.createMarkers();
    });
  }



createMarkers() {
  var bounds = this.map.getVisibleRegion();
  var sw = bounds.southwest, ne = bounds.northeast;
  var diffY = (ne.lat - sw.lat), diffX = (ne.lng - sw.lng);
  for (var i = 0; i < 50; i++) {
    this.map.addMarker({
      'position': {
        'lat': sw.lat + diffY * Math.random(),
        'lng': sw.lng  + diffX * Math.random()
      }
    }).then((marker:Marker) => {
      this.map.on('animate').subscribe((params: []) => {
        let animation: string = params[0];
        marker.setAnimation(animation);
      });
    });
  }
}
onButtonClick() {
  let btnTxt: string = event.srcElement.innerText;
  this.map.trigger("animate", btnTxt);
/*
    return;
    if (!this.mapReady) {
      this.showToast('map is not ready yet. Please try again.');
      return;
    }

    // Get the location of you
    this.map.getMyLocation()
      .then((location: MyLocation) => {
        console.log(JSON.stringify(location, null ,2));

        // Move the map camera to the location with animation
        return this.map.animateCamera({
          target: location.latLng,
          zoom: 17,
          tilt: 30
        }).then(() => {
          // add a marker
          return this.map.addMarker({
            title: '@ionic-native/google-maps plugin!',
            snippet: 'This plugin is awesome!',
            position: location.latLng,
            animation: GoogleMapsAnimation.BOUNCE
          });
        })
      }).then((marker: Marker) => {
        // show the infoWindow
        marker.showInfoWindow();

        // If clicked it, display the alert
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          this.showToast('clicked!');
        });
      });
*/
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present(toast);
  }
}
