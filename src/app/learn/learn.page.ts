import { Component, Output, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-learn',
  templateUrl: 'learn.page.html',
  styleUrls: ['learn.page.scss']
})
export class LearnPage {

  @ViewChild("pageFrame") pageframe: ElementRef;
  private _resourcePath: string;

  @Output()
  public get resourcePath(): string {
    return this._resourcePath;
  }
  public set resourcePath(v: string) {
    if (v != this._resourcePath) {
      this._resourcePath = v;
      if (this.pageframe)
        this.pageframe.nativeElement.src = this.resourcePath;// this.sanitizer.bypassSecurityTrustResourceUrl(this.resourcePath);
    }
  }


  constructor(public sanitizer: DomSanitizer) {
    this.resourcePath = "";


  }

}
