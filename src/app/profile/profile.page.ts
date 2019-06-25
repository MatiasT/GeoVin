import { Component, OnInit, Input } from '@angular/core';
import { RepositoryService } from '../storage/repository.service';
import { ModalController } from '@ionic/angular';
import { sightingReport } from '../storage/sightingReport';
import { ViewReportPage } from '../view-report/view-report.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {


  private _privateCommits: boolean;
  public get privateCommits(): boolean {
    return this._privateCommits;
  }
  @Input()
  public set privateCommits(v: boolean) {
    if (v != this._privateCommits) {
      this._privateCommits = v;
      let settings = this.repository.getSettings();
      settings.privateCommits = v;
      this.repository.updateSettings(settings);
    }
  }


  private _commitOverWifi: boolean;
  public get commitOverWifi(): boolean {
    return this._commitOverWifi;
  }
  @Input()
  public set commitOverWifi(v: boolean) {
    if (v != this._commitOverWifi) {
      this._commitOverWifi = v;
      let settings = this.repository.getSettings();
      settings.commitOverWifi = v;
      this.repository.updateSettings(settings);
    }
  }

  constructor(public repository: RepositoryService, private modalController:ModalController) {
    let settings = repository.getSettings();
    this._commitOverWifi = settings.commitOverWifi;
    this._privateCommits = settings.privateCommits;
  }

  ngOnInit() {

  }

  public async showReport(report:sightingReport){
    const modal = await this.modalController.create({animated:true,component:ViewReportPage});
    await modal.present();
  }

}
