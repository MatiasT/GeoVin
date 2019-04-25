import { Injectable } from '@angular/core'; 
import { HttpClient} from "@angular/common/http";
import { locationReport } from './LocationReport';

@Injectable({
  providedIn: 'root'
})
export class GeoVinAPIService {
  baseURL: string="http://www.geovin.com.ar/connect2";

  constructor(private http: HttpClient) {}


/**
 * test
 */
public test() {
  return new Promise((res,rej)=>{
      setTimeout(()=>{res();},3000);
  });
}
 public getReportJson(data:string){
   //the return of the service is not a valid json.
   //first of all i need to strip that header
  data=data.slice(data.indexOf('{'));
  //TODO:this is a hack and i do not like it. this process should be rebuilt.
  data=data.replace(new RegExp("}{", 'g'),"},{");
  return "["+data+"]";
}
public GetAllReports() {
  return new Promise((res,rej)=>{
    this.http.get(this.baseURL+"/getallmapa.php",{responseType:'text'}).toPromise().then(
      (data:string)=>{ 
        //console.log(data); 
        if(!data.startsWith('"GetMapaOk"'))
        {
            //error
            rej( {msg:"Invalid json received. ",data:data});
        }else{
          //trims that weird head before the json
          
          try{
            let fixedContent = this.getReportJson(data);
            let obj = JSON.parse(fixedContent);
            res(obj.map(locationReport.FromObject));
          }catch(e)
          {
            rej(e);
          }
          
        }
      },
      (err)=>{rej(err);});
  });
}
}
