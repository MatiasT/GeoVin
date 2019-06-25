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
      let self = this;
      this._privateCommits = v;
      this.repository.getSettings().then((settings) => {
        settings.privateCommits = v;
        this.repository.updateSettings(settings);
      });

    }
  }


  private _commitOverWifi: boolean;
  private reports: sightingReport[];
  public get commitOverWifi(): boolean {
    return this._commitOverWifi;
  }
  @Input()
  public set commitOverWifi(v: boolean) {
    if (v != this._commitOverWifi) {
      this._commitOverWifi = v;
      this.repository.getSettings().then((settings) => {
        settings.commitOverWifi = v;
        this.repository.updateSettings(settings);
      });
    }
  }

  constructor(public repository: RepositoryService, private modalController: ModalController) {
    this.reports = [];
    let self=this;
    //TODO: this is a hack to go around the async that i inserted into the getReports
    let update = async () => {
      await repository.ready;
      self.reports=await repository.getReports();
      setTimeout(update,10000);
    }
    update();
  }

  async ngOnInit() {
    let settings = await this.repository.getSettings();
    this._commitOverWifi = settings.commitOverWifi;
    this._privateCommits = settings.privateCommits;
  }

  public async showReport(report: sightingReport) {
    const modal = await this.modalController
      .create(
        {
          animated: true,
          component: ViewReportPage,
          componentProps: { report: report }
        });
    await modal.present();
  }

}
