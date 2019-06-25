import { Injectable } from '@angular/core';
import { sightingReport } from "./sightingReport";
import { Settings } from './settings';
import { User } from './user';
import { NativeStorage } from '@ionic-native/native-storage/ngx'
import { Platform } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})

export class RepositoryService {
  private reports: sightingReport[];
  private settings: Settings;
  private user: User;

  private readyPromise: Promise<any>;
  public get ready(): Promise<any> {
    return this.readyPromise;
  }


  constructor(private storage: NativeStorage, private platform: Platform) {
    let self = this;
    self.readyPromise = new Promise(
      (res) => {
        self.init().then(() => res());
      });
  }
  private async init(): Promise<RepositoryService> {
    await this.platform.ready();
    //the storage does not hold type info, i'll create my own instances here.
    let keys: Array<string> = await this.storage.keys();
    if (!keys.includes("reports")) {
      await this.storage.setItem("reports", new Array<sightingReport>());
    }
    this.reports = (await this.storage.getItem('reports')).map(
      (d: any) => {
        let result: sightingReport = Object.assign(new sightingReport(), d);
        result.datetime = new Date(result.datetime);
        return result;
      });
    if (!keys.includes("settings")) {
      await this.storage.setItem("settings", new Settings());
    }
    this.settings = Object.assign(new Settings(), await this.storage.getItem('settings'));
    return this;
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
    this.reports.unshift(report);
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
