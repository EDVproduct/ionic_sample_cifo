import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap } from '@capacitor/google-maps';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  coordenades: GeolocationPosition;

  constructor() {}
  ngOnInit(): void {
    this.printCurrentPosition();
  }

  async printCurrentPosition() {
    this.coordenades = await Geolocation.getCurrentPosition();
    this.createMap();
  };

  async createMap() {
    const myApiKey = '';
    const mapElement = document.getElementById('my-map');
    const mapConfig = {
      center: {
        lat: this.coordenades.coords.latitude,
        lng: this.coordenades.coords.longitude,
      },
      zoom: 15,
    };
    const mapOptions = {
      id: 'map',
      apiKey: myApiKey,
      config: mapConfig,
      element: mapElement,
    };

    // Create the Map Element
    const map = await GoogleMap.create(mapOptions);

    await map.addMarkers([{
      coordinate: {
        lat: this.coordenades.coords.latitude,
        lng: this.coordenades.coords.longitude,
      },
      title: 'Hello world',
    }]);

  }

}
