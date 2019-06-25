import { Component, OnInit, Input } from '@angular/core';
import { sightingReport } from '../storage/sightingReport';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.page.html',
  styleUrls: ['./view-report.page.scss'],
})
export class ViewReportPage implements OnInit {

  constructor() { }
  @Input()
  public report: sightingReport;
  ngOnInit() {
  }

}
