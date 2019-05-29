import { Component, OnInit } from '@angular/core';
import { ReportRepositoryService } from '../storage/report-repository.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public repository: ReportRepositoryService) { }

  ngOnInit() {
    
  }

  
}
