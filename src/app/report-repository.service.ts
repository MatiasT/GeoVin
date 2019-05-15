import { Injectable } from '@angular/core';
import { sightingReport } from "./sightingReport";
@Injectable({
  providedIn: 'root'
})
export class ReportRepositoryService {

  constructor() { }

  getReports(): sightingReport[] {
    return [];
  }
}
