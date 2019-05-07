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
  @ViewChild("dataMap") dataMap: UIMapComponent; 
  ngOnInit(): void {
  let self=this;
  self.rest.GetAllReports().then(
    (data:locationReport[])=>{ 
      
      for (var i = 0, len = data.length; i < len; i++) {
        //TODO: replace this with bulk add
        self.dataMap.AddClusteredMarker([data[i].lat,data[i].lng]);
      }
      self.loaded=true;
    },(err)=>{
      console.error(err);});  
  }
  


}
