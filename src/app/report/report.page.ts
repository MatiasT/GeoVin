import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { UIMapComponent } from '../uimap/uimap.component';

const emptyImagePath="assets/camera.svg";

@Component({
  selector: 'app-report',
  templateUrl: 'report.page.html',
  styleUrls: ['report.page.scss']
})
export class ReportPage implements OnInit {

  @ViewChild("map") map: UIMapComponent;
  firstImage: any;
  locationMarker:any;
  secondImage: any;
  /**
   *
   */
  constructor(private camera: Camera) {
    this.resetImages();
  }
  private resetImages(){
    this.firstImage=this.secondImage=emptyImagePath;
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
    if(this.locationMarker==null){
      this.locationMarker=this.map.AddCenteredMarker();
      this.map.map.on("move",(e)=>{this.locationMarker
        .setLatLng(this.map.map.getCenter()).update()});
    }  
    //this.map.refresh();
    //center the map in the user, if it exists
    //TODO: do this right?
    if(this.map.userMarker!=null){
      this.map.map.setView(this.map.userMarker.getLatLng(),4);
    }
  }
  picturesNotTaken():boolean{
    return this.firstImage==emptyImagePath || this.secondImage==emptyImagePath;
  }
  async takeFirstPicture(){
    this.firstImage=await this.takePicture();
  }
  async takeSecondPicture(){
    this.secondImage= await this.takePicture();
  }
  async takePicture() {
    let imageData = await this.camera.getPicture(this.options);
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    // let base64Image = 'data:image/jpeg;base64,' + imageData;
    //imageData should contain the path otherwise, but it starts with "blob:". i'll remove that
    console.log(imageData);
    //TODO: show the image, and let the user re-take the picture maybe?
    //both images could be on the same page i guess
    return imageData;
    //TODO: error handling.
  }
  async next() {
    await this.slider.lockSwipes(false);
    await this.slider.slideNext();
    await this.slider.lockSwipes(true);
  }
  async reset() {
    this.resetImages();
    await this.slider.lockSwipes(false);
    await this.slider.slideTo(0);
    await this.slider.lockSwipes(true);
  }

}
