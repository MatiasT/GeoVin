import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { UIMapComponent } from '../uimap/uimap.component';
import { ReportRepositoryService } from '../report-repository.service';
import { File } from "@ionic-native/file/ngx";
import { sightingReport } from '../sightingReport';
import { Habitat } from '../habitat';
const emptyImagePath = "assets/camera.svg";

@Component({
  selector: 'app-report',
  templateUrl: 'report.page.html',
  styleUrls: ['report.page.scss']
})
export class ReportPage implements OnInit {

  @ViewChild("map") map: UIMapComponent;
  firstImage: any;
  locationMarker: any;
  secondImage: any;
  habitat: string;
  subHabitat: string;
  otherHabitat: string;
  /**
   *
   */
  constructor(private camera: Camera, private repository: ReportRepositoryService, private file: File) {
    this.resetData();
  }
  private resetData() {
    this.resetImages();
    this.habitat = "domicilio";
    this.subHabitat = "";
    this.otherHabitat = "";
  }
  private resetImages() {
    this.firstImage = this.secondImage = emptyImagePath;
  }
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    saveToPhotoAlbum: false
  }
  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  @ViewChild("slider") slider: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  ngOnInit(): void {
    this.slider.lockSwipes(true);
  }

  async showMap() {
    //TODO: pre-load map to ensure the first transition is not as bumpy
    await this.next();
    if (this.locationMarker == null) {
      this.locationMarker = this.map.AddCenteredMarker();
      this.map.map.on("move", (e) => {
        this.locationMarker
          .setLatLng(this.map.map.getCenter()).update()
      });
    }
    //TODO: do this right?
    if (this.map.userMarker != null) {
      this.map.map.setView(this.map.userMarker.getLatLng(), 4);
    }
  }
  //dealing with images & camera
  firstPictureNotTaken(): boolean {
    return this.firstImage == emptyImagePath;
  }
  secondPictureNotTaken(): boolean {
    return this.secondImage == emptyImagePath;
  }
  async takeFirstPicture() {
    this.firstImage = await this.takePicture();
  }
  async takeSecondPicture() {
    this.secondImage = await this.takePicture();
  }
  async takePicture() {
    let imageData = await this.camera.getPicture(this.options);
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    // let base64Image = 'data:image/jpeg;base64,' + imageData;

    return imageData;
    //TODO: error handling.
  }
  //habitat selection

  habitatChanged(evt: any) {
    this.subHabitat = "";
    this.otherHabitat = "";
  }
  habitatNotSelected() {
    return this.subHabitat == "" || (this.subHabitat == "otros" && this.otherHabitat == "");
  }

  //wrap up repport
  //save images to file.
  async saveImage(imagePath: string, fileName: string) {
    let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
    let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
    //this is failing because the paths are not well formed.
    let testPath=await this.file.resolveLocalFilesystemUrl(imagePath);
    let testFile = await this.file.readAsText(correctPath,currentName);
    let entry = await this.file.copyFile(correctPath, currentName, this.file.dataDirectory, fileName);
    return entry.fullPath;
  }
  private printDate(date: Date): String {
    return [date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()].join("_");
  }
  async commitReport() {
    //i need to save the pictures taken into the filesystem
    let report = new sightingReport();
    report.datetime = new Date();

    report.firstPicture = await this.saveImage(this.firstImage, report.username + this.printDate(report.datetime) + "_1.jpg");
    report.secondPicture = await this.saveImage(this.firstImage, report.username + this.printDate(report.datetime) + "_2.jpg");
    let location = this.locationMarker.getLatLng();
    //TODO: use an object to encapsulate location?
    report.lat=location.lat;
    report.lng=location.lng
    report.habitat=new Habitat(this.habitat,this.subHabitat,this.otherHabitat);
    await this.repository.addReport(report);
    await this.reset();
  }

  //slider / wizard 
  async next() {
    await this.slider.lockSwipes(false);
    await this.slider.slideNext();
    await this.slider.lockSwipes(true);
  }
  async reset() {
    this.resetData();
    await this.slider.lockSwipes(false);
    await this.slider.slideTo(0);
    await this.slider.lockSwipes(true);
  }

}
