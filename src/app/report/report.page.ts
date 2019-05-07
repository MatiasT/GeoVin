import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { UIMapComponent } from '../uimap/uimap.component';

@Component({
  selector: 'app-report',
  templateUrl: 'report.page.html',
  styleUrls: ['report.page.scss']
})
export class ReportPage implements OnInit {

  @ViewChild("map") map: UIMapComponent;
  /**
   *
   */
  constructor(private camera: Camera) {

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


  takePicture(name: string) {
    let self = this;
    self.camera.getPicture(self.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      //imageData should contain the path
      console.log(imageData);
      self.next();
    }, (err) => {
      // Handle error
    });
  }
  next() {
    let self = this;
    self.slider.lockSwipes(false).then(() => {
      self.slider.slideNext().then(() => {
        self.slider.lockSwipes(true);
        //TODO: refresh the map only if in the correct tab.
        self.map.refresh();
      });
    });
  }
  reset() {
    let self = this;
    self.slider.lockSwipes(false).then(() => {
      self.slider.slideTo(0).then(() => { self.slider.lockSwipes(true); });
    });
  }

}
