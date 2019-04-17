declare var OpenLayers: any;
import { Component, OnInit, Input, ViewChild,Renderer2,Inject } from '@angular/core';
import { IonSpinner } from '@ionic/angular';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-uimap',
  templateUrl: './uimap.component.html',
  styleUrls: ['./uimap.component.scss'],
})
export class UIMapComponent implements OnInit {
  map:any;
  mapLoaded=false;
  constructor(private renderer: Renderer2,@Inject(DOCUMENT) private _document) { }


  ngOnInit() {
    var self=this;
    this.injectSDK().then(()=>{return self.loadMap();});
  }
 private loadMap():Promise<any>{
   var self=this;
   return new Promise((resolve,reject)=>{
     self.map = new OpenLayers.Map("mapdiv");
     self.map.addLayer(new OpenLayers.Layer.OSM());
     var lonLat = new OpenLayers.LonLat( -0.1279688 ,51.5077286 )
      .transform(
        new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
        this.map.getProjectionObject() // to Spherical Mercator Projection
        );
    var zoom=16;
    var markers = new OpenLayers.Layer.Markers( "Markers" );
    self.map.addLayer(markers);
    markers.addMarker(new OpenLayers.Marker(lonLat));
    
    self.map.setCenter (lonLat, zoom);
    resolve(true);
    //here we should load the markers i guess
    });
  }
  
  private injectSDK(): Promise<any> {

    return new Promise((resolve, reject) => {

        var loadFunc= () => {
            this.mapLoaded = true;
            resolve(true);
        }

        let script = this.renderer.createElement('script');
        script.id = 'map';
        script.src="http://www.openlayers.org/api/OpenLayers.js";
        script.onload=loadFunc;
        this.renderer.appendChild(this._document.body, script);

    });
  }
}
