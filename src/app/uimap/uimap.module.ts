import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { UIMapComponent } from './uimap.component';

@NgModule({
    imports:[
        CommonModule
    ],
    declarations:[UIMapComponent],
    exports:[UIMapComponent]
})
export class UIMapModule
{
    
}