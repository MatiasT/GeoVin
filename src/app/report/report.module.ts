import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportPage } from './report.page';
import { UIMapComponent } from '../uimap/uimap.component';
import { UIMapModule } from '../uimap/uimap.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    UIMapModule,
    RouterModule.forChild([{ path: '', component: ReportPage }])
  ],
  declarations: [ReportPage]
})
export class ReportPageModule {}
