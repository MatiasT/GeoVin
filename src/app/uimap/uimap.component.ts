declare var L: any;
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
  
  private injectSDK(): Promise<any> {

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
