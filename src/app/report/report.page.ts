import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { UIMapComponent } from '../uimap/uimap.component';

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
  habitat:string;
  subHabitat:string;
  otherHabitat:string;
  /**
   *
   */
  constructor(private camera: Camera) {
    this.resetData();
  } 
  private resetData(){
    this.resetImages();
    this.habitat="domicilio";
    this.subHabitat="";
    this.otherHabitat="";
  }
  private resetImages() {
    this.firstImage = this.secondImage = emptyImagePath;
  }
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
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
    console.log(imageData);
    return imageData;
    //TODO: error handling.
  }
//habitat selection

habitatChanged(evt:any){
  this.subHabitat="";
  this.otherHabitat="";
}
habitatNotSelected(){
  return this.subHabitat=="" || ( this.subHabitat=="otros" && this.otherHabitat=="");
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
