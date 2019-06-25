import { Habitat } from './habitat';

export class sightingReport {
  username: string;
  datetime: Date;
  firstPicture: string;
  secondPicture: string;
  lat: number;
  lng: number;
  habitat: Habitat;

  reportID: Number;
  verified: boolean;
  sentFirstPicture: boolean;
  sentSecondPicture: boolean;
  private:boolean;
  species:string;


  public get state(): string {
    if (this.reportID == null
      || this.sentFirstPicture == false
      || this.sentSecondPicture == false) {
      return "Pending";
    }
    if(!this.verified)
    {
      return "Uploaded";
    }
    return "Verified";
  }

  /**
   *
   */
  constructor() {
    this.verified = false;
    this.sentFirstPicture = false;
    this.sentSecondPicture = false;
    this.private=false;
    this.reportID = null;
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