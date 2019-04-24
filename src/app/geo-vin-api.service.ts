import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeoVinAPIService {

  constructor() { }

/**
 * test
 */
public test() {
  return new Promise((res,rej)=>{

      setTimeout(()=>{res();},3000);

  });
}
}
