import { Component, OnInit, ViewChild } from '@angular/core';
import { GeoVinAPIService } from '../geo-vin-api.service';

@Component({
  selector: 'app-explore',
  templateUrl: 'explore.page.html',
  styleUrls: ['explore.page.scss']
})
export class ExplorePage  implements OnInit {
  
  constructor(public rest:GeoVinAPIService) {}
  @ViewChild("map") map: any; 
  ngOnInit(): void {
  this.rest.test().then(()=>{debugger;});  
  }
  


}
