import { Injectable } from '@angular/core';
import { sightingReport } from "./sightingReport";
import { Settings } from './settings';
@Injectable({
  providedIn: 'root'
})
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
