//(INFO): library reference at https://leafletjs.com/reference-1.4.0.html
import { Map, tileLayer, marker, MarkerClusterGroup, markerClusterGroup, MarkerOptions, icon } from "leaflet"
import "leaflet.markercluster";
import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Observable, Subscription } from 'rxjs';



@Component({
  selector: 'app-uimap',
  templateUrl: './uimap.component.html',
  styleUrls: ['./uimap.component.scss'],
  providers: [Geolocation],
})
export class UIMapComponent implements AfterViewChecked, AfterViewInit {
  private _showUser: boolean = false;
  private geolocationSubscription: Subscription;
  private initialized: boolean;
  public get showUser(): boolean {
    return this._showUser;
  }
  @Input()
  public set showUser(v: boolean) {
    if (this.initialized && v != this._showUser) {
      v ? this.startShowingUser() : this.stopShowingUser();
    }
    this._showUser = v;
  }

  @ViewChild("mapdiv") mapdiv: ElementRef;
  map: Map;
  watch: Observable<Geoposition>;
  //TODO: check the type of the marker.
  userMarker: any;
  markerCluster: MarkerClusterGroup;
  userMarkerOptions: any;
  constructor(private geolocation: Geolocation) {
    this.userMarkerOptions = {
      icon: icon({
        iconUrl: 'assets/img/person.svg',
        shadowUrl: 'assets/img/person-shadow.svg',
        iconSize: [20, 35], // size of the icon
        shadowSize: [25, 30], // size of the shadow
        iconAnchor: [10, 34], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 29],  // the same for the shadow
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
      })
    };

  }

  ngAfterViewChecked(): void {
    this.refresh();
  }
  ngAfterViewInit(): void {
    let self = this;
    this.loadMap()
      .then(() => {
        self.initialized = true;
        if (self.showUser) self.startShowingUser();
      });
  }

  refresh() {
    if (this.map) {
      this.map.invalidateSize(false);
    }
  }

  private startShowingUser() {
    if (this.geolocationSubscription) {
      console.log("Called startShowingUser while the subscription was already made. Please call stop before calling start again");
      return; //already running
    }

    this.userMarker = this.AddCenteredMarker(this.userMarkerOptions);
    this.watch = this.geolocation.watchPosition();
    this.geolocationSubscription = this.watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      this.userMarker.setLatLng([data.coords.latitude, data.coords.longitude]).update();
    }, (error) => {
      console.error(error);
    }, () => { console.log("completed"); });

  }
  private stopShowingUser() {
    if (this.userMarker) {
      this.RemoveMarker(this.userMarker);
      this.userMarker = null;
    }
    if (this.geolocationSubscription) {
      this.geolocationSubscription.unsubscribe();
      this.geolocationSubscription = null;
    }
    if (this.watch) {
      this.watch = null;
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
  public AddCenteredMarker(options?: MarkerOptions) {
    return this.AddMarker(this.map.getCenter(), options);
  }
  public AddMarker(location, options?: MarkerOptions) {
    let m = marker(location, options);
    m.addTo(this.map);
    return m;
  }
  public RemoveMarker(marker) {
    this.map.removeLayer(marker);
  }
  //TODO: i think a good idea would be to provide a batch add. it would speed up the map usage
  public AddClusteredMarker(location) {
    let m = marker(location);
    this.markerCluster.addLayer(m);
    return m;
  }
  public RemoveMarkerFromCluster(marker) {
    this.markerCluster.removeLayer(marker);
  }


}
