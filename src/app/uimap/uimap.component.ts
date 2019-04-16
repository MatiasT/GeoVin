import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IonSpinner } from '@ionic/angular';

@Component({
  selector: 'app-uimap',
  templateUrl: './uimap.component.html',
  styleUrls: ['./uimap.component.scss'],
})
export class UIMapComponent implements OnInit {
  
  showSpinner=true;
  constructor() { }


  ngOnInit() {
    setTimeout(()=>{
      this.loadMap();
    },3000);
  }
  loadMap(){

    this.showSpinner=false;
  } 
}
