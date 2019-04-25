export class locationReport{
    /**
     *
     */
    constructor(lat:number,lng:number,type:string,user:string) {
        this.lat=lat;
        this.lng=lng;
        this.type=type;
        this.username=user;
    }
    lat:number;
    lng:number;
    type:string;
    username:string;
    static FromObject(obj){

        return new locationReport(
            Number.parseFloat(obj.lat),
            Number.parseFloat(obj.lat),
            obj.valorVinchuca,
            obj.username);
    }
}