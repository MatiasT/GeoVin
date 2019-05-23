import { Habitat } from './habitat';

export class sightingReport {
    username:string;
  datetime: Date;
  firstPicture: string;
  secondPicture: string;
  lat: number;
  lng: number;
  habitat:Habitat;
    /**
     *
     */
    constructor() {

    }
/*
//this is the data i need to send.
//since i need the full image path into fotoPath i think i wont have that data here.
//i'll create another class to handle the communication

    username:string;
    deviceID:string;
    datetime:Date;
    lat:Number;
    lng:Number;
    valorVinchuca:string;
    foto1Path:string;
    foto2Path:string;
    foto3Path:string;
    foto4Path:string; //this one seems to hold the habitat.
    privado:string; //si / no
    gpsdetect:any; //null?
    wifidetect:any; //null?
    mapdetect:string; //si/null?
    verificado:any; //"no%20verificado"??
    */
}