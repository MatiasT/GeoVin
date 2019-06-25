import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { sightingReport } from '../storage/sightingReport';
import { UIMapComponent } from '../uimap/uimap.component';
import { Components } from '@ionic/core';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.page.html',
  styleUrls: ['./view-report.page.scss'],
})
export class ViewReportPage implements AfterViewInit {
  ngAfterViewInit(): void {
    this.updateMarker();
  }

  constructor() {
    this.marker = null;

  }

  private marker: any;
  private _report: sightingReport;
  public get report(): sightingReport {
    return this._report;
  }
  @Input()
  public set report(v: sightingReport) {
    this._report = v;
  }

  @Input() modal: Components.IonModal;

  @ViewChild("dataMap") dataMap: UIMapComponent;

  updateMarker() {
    if (this.marker) {
      this.dataMap.RemoveMarker(this.marker);
      this.marker = null;
    }
    let latlng = [this.report.lat, this.report.lng];
    this.marker = this.dataMap.AddMarker(latlng);
    this.dataMap.setView(latlng, 6);
  }
  ngOnInit() {

  }
  public back() {
    this.modal.dismiss();
  }
}
