//(INFO): library reference at https://leafletjs.com/reference-1.4.0.html
import { Map, tileLayer, marker } from "leaflet"
import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-uimap',
  templateUrl: './uimap.component.html',
  styleUrls: ['./uimap.component.scss'],
  providers: [Geolocation],
})
export class UIMapComponent implements OnInit, AfterViewChecked {
  map: Map;
  watch: Observable<Geoposition>;
  //TODO: check the type of the marker.
  userMarker: any;
  constructor(private geolocation: Geolocation) { }

  ngAfterViewChecked(): void {
    this.map.invalidateSize(false);
  }
  ngOnInit(): void {
    let self = this;
    this.loadMap()
      .then(() => {
        self.userMarker = self.AddCenteredMarker();
        self.watch = self.geolocation.watchPosition();
        self.watch.subscribe((data) => {
          // data can be a set of coordinates, or an error (if an error occurred).
          // data.coords.latitude
          // data.coords.longitude
          self.userMarker.setLatLng([data.coords.latitude, data.coords.longitude]).update();
        }, (error) => {
          console.error(error);
        }
          , () => { console.log("completed"); });

      });

  }
  private loadMap(): Promise<any> {
    var self = this;
    return new Promise((resolve, reject) => {
      self.map = new Map('mapdiv').setView([-35, -62], 4);
      //TODO: this is for debugging purposes
      window['map'] = self.map;
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(self.map);
      resolve(true);
    });
  }
  public AddCenteredMarker() {
    return this.AddMarker(this.map.getCenter());
  }
  public AddMarker(location) {
    let m = marker(location);
    m.addTo(this.map);
    return m;
  }
  //TODO: use the marker cluster library https://github.com/Leaflet/Leaflet.markercluster
  //tutorial at https://asmaloney.com/2015/06/code/clustering-markers-on-leaflet-maps/


  //TODO: I should be able to configure if i want an user marker. 
}
