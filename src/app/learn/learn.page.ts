import { Component, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-learn',
  templateUrl: 'learn.page.html',
  styleUrls: ['learn.page.scss']
})
export class LearnPage {
  @Output()
  resourcePath: string;
  
  constructor(public sanitizer:DomSanitizer) {
      this.resourcePath=null;
  }

}
