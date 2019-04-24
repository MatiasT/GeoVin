import { Injectable } from '@angular/core'; 
import { HttpClient } from "@angular/common/http";
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
 
public GetAllReports() {
  return new Promise((res,rej)=>{
    this.http.get(this.baseURL+"/getallmapa.php").toPromise().then(
      (data)=>{res(data);},(err)=>{rej(err);});
  });
}
}
