import { Injectable } from '@angular/core';
import { sightingReport } from "./sightingReport";
import { Settings } from './settings';
@Injectable({
  providedIn: 'root'
})
//TODO: rename this. It will centralize my persistance and as such the name should not be tied to reports.
export class ReportRepositoryService {
  
  constructor() { 
    this.reports = new Array<sightingReport>();
    this.settings=new  Settings();
  }
  private reports: sightingReport[];
  private settings: Settings;
//TODO: make the getters async.
  getReports(): sightingReport[] {
    return this.reports;
  }
  getPendingReports():sightingReport[]{

    return this.getReports().filter(report=>report.state=="Pending");
  }
  async addReport(report: sightingReport) {
    //TODO: really save it to some storage
    this.reports.push(report);
  }

  getSettings():Settings {
    return this.settings;
  }
  async updateSettings(settings:Settings){
    this.settings=settings;
  }
}
