import { Component, OnInit } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  constructor() {}
  ngOnInit(): void {
    this.createMap();
  }

  async createMap() {
    const myApiKey = '';
    const mapElement = document.getElementById('my-map');
    const mapConfig = {
      center: {
        lat: 33.6,
        lng: -117.9,
      },
      zoom: 8,
      androidLiteMode: false,
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
        lat: 33,
        lng: 117,
      },
      title: 'Hello world',
    }]);

  }

}
