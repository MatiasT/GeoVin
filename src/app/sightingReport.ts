export class sightingReport {
    /**
     *
     */
    constructor() {

    }

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
}