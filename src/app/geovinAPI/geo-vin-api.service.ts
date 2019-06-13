import { Injectable } from '@angular/core';
import { HTTP } from "@ionic-native/http/ngx";
import { locationReport } from './locationReport';
import { ReportRepositoryService } from '../storage/report-repository.service';
import { Network } from '@ionic-native/network/ngx';
import { sightingReport } from '../storage/sightingReport';
import { Settings } from '../storage/settings';
import { File } from "@ionic-native/file/ngx";

const sleepTime = 10000;
@Injectable({
  providedIn: 'root'
})
export class GeoVinAPIService {
  baseURL: string = "http://www.geovin.com.ar/connect2";

  constructor(private http: HTTP, private repository: ReportRepositoryService, private network: Network, private file: File) {

  }

  //TODO: have a reference to the running task, maybe?

  private running: boolean = false;

  /*
  *This method starts the background process of commiting the reports.
  *If this method was already called it does nothing.
  */
  public async startService() {
    if (this.running) return;
    this.running = true;
    let self = this;
    let step = async () => {
      try {
        await self.TryToSendReports();
      } catch (error) {
        //TODO: more handling?
        console.error(error);
        debugger;
      }
      setTimeout(step, sleepTime);
    }

    //TODO: calling this function via setTimout clears the receiver, breaking everything.
    step();
  }
  /*
  This method gets the pending data to be sent, the settings, and tryes to commit it to the server
  */
  private async TryToSendReports() {
    let settings = this.repository.getSettings();
    if (!settings.commitOverWifi || //if the settings say i can commit over anything, or i can commit over wifi only and i am connected to wifi
      (settings.commitOverWifi && this.network.type == this.network.Connection.WIFI)) {
      this.repository.getPendingReports().forEach(async report => {
        if (report.reportID == null) {
          report.reportID = await this.sendReport(report, settings);
          //TODO: update the report?
        }
        if (report.sentFirstPicture) {
          report.sentFirstPicture = await this.sendPicture(report.firstPicture);
          //TODO: update the report?
        }
        if (report.sentSecondPicture) {
          report.sentSecondPicture = await this.sendPicture(report.secondPicture);
          //TODO: update the report?
        }
      });
    }
  }
  private GetFormattedDate(date: Date): string {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    return day + "-" + month + "-" + year;
  }
  private async sendReport(report: sightingReport, settings: Settings): Promise<Number> {
    let result = await this.http.get(this.baseURL + "/addpuntomapa.php", {
      username: null,
      deviceID: "",
      dateandtime: this.GetFormattedDate(report.datetime), //dd-mm-yyyy
      lat: report.lat.toString(),
      lng: report.lng.toString(),
      foto1path: report.firstPicture.substr(report.firstPicture.lastIndexOf('/') + 1),
      foto2path: report.secondPicture.substr(report.secondPicture.lastIndexOf('/') + 1),
      foto3path: null,
      foto4path: report.habitat.toString(), //"habitat_dormitorio"
      privado: settings.privateCommits ? "si" : "no",
      gpsdetect: null,
      wifidetect: null,
      mapdetect: "si",
      terminado: null,
      verificado: "No Verificado"
    }, {});
    if (result.status != 200) {
      throw result;
    }

    let resultData: string = result.data;
    //"Marcadores"{"serverId":"10194"}
    if (!resultData.startsWith('"Marcadores"')) {
      console.error(result);
      throw "Invalid response";
    }
    resultData = resultData.substr(12);
    let obj = JSON.parse(resultData);
    return obj.serverId;

  }

  private async sendPicture(imagePath: string): Promise<boolean> {

    let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
    let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);

    const imgBlob = new Blob([await this.file.readAsArrayBuffer(currentName, correctPath)], {
      type: "image/jpeg"
    });

    let response = await this.http.post(this.baseURL + "/upload_file.php?usr=geovin_upload&pss=geovin_pass", { upload_file: imgBlob }, {});

    if (response.status != 200) { throw response; }

    let data: string = response.data;
    if (data != "success") {
      console.error("Invalid response when posting photo");
      throw data;
    }
    return true;
  }



  private getReportJson(data: string) {
    //the return of the service is not a valid json.
    //first of all i need to strip that header
    data = data.slice(data.indexOf('{'));
    //TODO:this is a hack and i do not like it. this process should be rebuilt.
    data = data.replace(new RegExp("}{", 'g'), "},{");
    return "[" + data + "]";
  }
  public GetAllReports() {
    return new Promise((res, rej) => {
      this.http.get(this.baseURL + "/getallmapa.php", {}, {}).then(response => {
        let data: string = response.data;
        //console.log(data); 
        if (!data.startsWith('"GetMapaOk"')) {
          //error
          rej({ msg: "Invalid json received. ", data: data });
        } else {
          //trims that weird head before the json

          try {
            let fixedContent = this.getReportJson(data);
            let obj = JSON.parse(fixedContent);
            res(obj.map(locationReport.FromObject));
          } catch (e) {
            rej(e);
          }

        }

      }, err => rej(err));
    });

  }
}
