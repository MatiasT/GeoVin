import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-report',
  templateUrl: 'report.page.html',
  styleUrls: ['report.page.scss']
})
export class ReportPage implements OnInit {
  ngOnInit(): void {
    
    this.slider.lockSwipes(true);
  }
  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  @ViewChild("slider") slider:IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  next(){
    let self=this;
    self.slider.lockSwipes(false).then(()=>{
      self.slider.slideNext().then(()=>{self.slider.lockSwipes(true);});});
  }
  reset(){
    let self=this;
    self.slider.lockSwipes(false).then(()=>{
      self.slider.slideTo(0).then(()=>{self.slider.lockSwipes(true);});});
  }

}
