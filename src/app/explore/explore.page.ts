import { Component, OnInit, ViewChild } from '@angular/core';
import { GeoVinAPIService } from '../geo-vin-api.service';
import { UIMapComponent } from '../uimap/uimap.component';
import { locationReport } from '../LocationReport';

@Component({
  selector: 'app-explore',
  templateUrl: 'explore.page.html',
  styleUrls: ['explore.page.scss']
})
export class ExplorePage  implements OnInit {
  
  loaded=false;
  constructor(public rest:GeoVinAPIService) {}
  @ViewChild("map") map: UIMapComponent; 
  ngOnInit(): void {
  let self=this;
  self.rest.GetAllReports().then(
    (data:locationReport[])=>{ 
      self.loaded=true;
      for (var i = 0, len = data.length; i < len; i++) {
        self.map.AddMarker([data[i].lat,data[i].lng]);
      }
    },(err)=>{
      console.error(err);});  
  }
  


}
