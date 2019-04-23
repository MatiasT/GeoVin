declare var L: any;

import { Component, OnInit, Input, ViewChild,Renderer2,Inject } from '@angular/core';
import { IonSpinner } from '@ionic/angular';
import { DOCUMENT } from '@angular/platform-browser';
import {Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-uimap',
  templateUrl: './uimap.component.html',
  styleUrls: ['./uimap.component.scss'],
  providers:[Geolocation]
})
export class UIMapComponent implements OnInit {
  map:any;
  mapLoaded=false;
  watch:Observable<Geoposition>;
  userMarker: any;
  constructor(private renderer: Renderer2,private geolocation: Geolocation,@Inject(DOCUMENT) private _document) { }


  ngOnInit() {
    let self=this;
    this.injectSDK().then(()=>{return self.loadMap();})
    .then(()=>{
      self.userMarker = self.AddCenteredMarker();
      self.watch = self.geolocation.watchPosition();
      self.watch.subscribe((data) => {
       // data can be a set of coordinates, or an error (if an error occurred).
       // data.coords.latitude
       // data.coords.longitude
       self.userMarker.setLatLng([data.coords.latitude, data.coords.longitude]).update(); 
      },(error)=>{
        console.error(error);}
        ,()=>{console.log("completed");});

    });
    
  }
 private loadMap():Promise<any>{
   var self=this;
   return new Promise((resolve,reject)=>{
     self.map =  L.map('mapdiv').setView([-35, -62], 4);
     //TODO: this is for debugging purposes
     window['map'] =self.map;
     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(self.map);
    resolve(true);
    //here we should load the markers i guess
    });
  }
  public AddCenteredMarker(){
   return  this.AddMarker( this.map.getCenter());
  }
  public AddMarker(location){
   let marker= L.marker(location);
   marker.addTo(this.map);
   return marker;
  }
  private injectSDK(): Promise<any> {
    //TODO: it is probably a good idea to install leaflet as a package and include it with the app.
    //If that is the case i can use another thing to test the network.

    //TODO: use the marker cluster library https://github.com/Leaflet/Leaflet.markercluster
    //tutorial at https://asmaloney.com/2015/06/code/clustering-markers-on-leaflet-maps/
    return new Promise((resolve, reject) => {

        var loadFunc= () => {
            this.mapLoaded = true;
            resolve(true);
        }
        //(INFO): library reference at https://leafletjs.com/reference-1.4.0.html
        let link =this.renderer.createElement("link");
        link.rel="stylesheet";
        link.href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css";
        //link.integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA==";
        //link.crossorigin="";
        
        let script = this.renderer.createElement('script');
        script.src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js";
       // script.integrity="sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg==";
       // script.crossorigin="";
        script.onload=loadFunc;
        this.renderer.appendChild(this._document.body,link);
        this.renderer.appendChild(this._document.body, script);

    });
  }
}
