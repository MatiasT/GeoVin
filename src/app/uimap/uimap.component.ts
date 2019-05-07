//(INFO): library reference at https://leafletjs.com/reference-1.4.0.html
import { Map, tileLayer, marker, MarkerClusterGroup, markerClusterGroup } from "leaflet"
import "leaflet.markercluster";
import { Component, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-uimap',
  templateUrl: './uimap.component.html',
  styleUrls: ['./uimap.component.scss'],
  providers: [Geolocation],
})
export class UIMapComponent implements OnInit, AfterViewChecked {
  @ViewChild("mapdiv")mapdiv:any;
  map: Map;
  watch: Observable<Geoposition>;
  //TODO: check the type of the marker.
  userMarker: any;
  markerCluster: MarkerClusterGroup;
  constructor(private geolocation: Geolocation) { }

  ngAfterViewChecked(): void {
    this.refresh();
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
  refresh() { 
    if(this.map){
     this.map.invalidateSize(false);
    }
  }
  private loadMap(): Promise<any> {
    var self = this;
    return new Promise((resolve, reject) => {
      //TODO: check who owns this nativeElement thing, if i do not supply the real div to leaflet, it all fails.
      //but i need to supply it this way because if i supply it by name, i have issues with multiple maps present on the same app.
      self.map = new Map(self.mapdiv.nativeElement).setView([-35, -62], 4);
      //TODO: this is for debugging purposes
      //window['map'] = self.map;
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(self.map);
      self.markerCluster = markerClusterGroup();
      self.map.addLayer(self.markerCluster);
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

  //TODO: i think a good idea would be to provide a batch add. it would speed up the map usage
  public AddClusteredMarker(location) {
    let m = marker(location);
    this.markerCluster.addLayer(m);
    return m;
  }
  

  //TODO: I should be able to configure if i want an user marker. 
}
