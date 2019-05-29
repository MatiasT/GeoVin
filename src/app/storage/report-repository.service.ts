import { Injectable } from '@angular/core';
import { sightingReport } from "./sightingReport";
@Injectable({
  providedIn: 'root'
})
export class ReportRepositoryService {

  constructor() { }
  private reports: sightingReport[];
  getReports(): sightingReport[] {
    return this.reports;
  }
  async addReport(report: sightingReport) {
    //TODO: really save it to some storage
    this.reports.push(report);
  }

}
