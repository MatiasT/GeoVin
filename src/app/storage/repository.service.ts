import { Injectable } from '@angular/core';
import { sightingReport } from "./sightingReport";
import { Settings } from './settings';
import { User } from './user';
import { NativeStorage } from '@ionic-native/native-storage/ngx'
import { Platform } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
//TODO: rename this. It will centralize my persistance and as such the name should not be tied to reports.
export class RepositoryService {
  private reports: sightingReport[];
  private settings: Settings;
  private user: User;

  constructor(private storage: NativeStorage, private platform: Platform) {
    let self = this;
    platform.ready().then(() => {
      this.storage.getItem('reports').then((data) => { self.reports = data; }, (err) => { console.error(err); self.reports = new Array<sightingReport>(); });
      this.storage.getItem('settings').then((data) => { self.settings = data; }, (err) => { console.error(err); self.settings = new Settings() });
    });
  }

  //TODO: make the getters async.
  getUser() {
    if (!this.user) return User.EmptyUser;
    return this.user;
  }
  getReports(): sightingReport[] {
    return this.reports;
  }
  getPendingReports(): sightingReport[] {
    return this.getReports().filter(report => report.state == "Pending");
  }
  async addReport(report: sightingReport) {
    this.reports.push(report);
    await this.updateReports();
  }

  getSettings(): Settings {
    return this.settings;
  }
  async updateSettings(settings: Settings) {
    this.settings = settings;
    await this.storage.setItem("settings", this.settings);
  }
  async updateReports() {
    await this.storage.setItem("reports", this.reports)
  }
}
