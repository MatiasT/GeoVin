import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExplorePage } from './explore.page';
import {UIMapComponent} from '../uimap/uimap.component';
import { UIMapModule } from '../uimap/uimap.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    UIMapModule,
    RouterModule.forChild([{ path: '', component: ExplorePage }])
  ],
  declarations: [ExplorePage]
})
export class ExplorePageModule {
@ViewChild("map") map: any; 

}
