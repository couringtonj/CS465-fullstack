import { Injectable, Inject } from '@angular/core';
import{Http, Headers} from '@angular/http';
import{Trip} from '../models/trip';

@Injectable()
export class TripDataService {

  constructor(private http: Http) { }

  private apiBaseUrl='http://localhost:3000/api/';
  private tripURL=`${this.apiBaseUrl}trips/`;
  public getTrips():Promise<Trip[]>{
    console.log('inside tripDataServices#getTrips');
    return this.http
      .get(this.tripURL)
      .toPromise()
      .then((Response)=>Response.json() as Trip[])
      .catch(this.handleError);
  }
  public addTrip(formData:Trip):Promise<Trip>{
    console.log('inside tripdataservice@addTrip');
    return this.http
      .post(this.tripURL,formData)
      .toPromise()
      .then(response=>response.json() as Trip[])
      .catch(this.handleError);
  }

  public getTrip():Promise<Trip>{
    return this.http
      .get(this.tripURL+tripCode)
      .toPromise()
      .then((Response)=>Response.json() as Trip)
      .catch(this.handleError);
  }
  public updateTrip(formData:Trip):Promise<Trip>{
    console.log('inside tripdataservice@updateTrip');
    return this.http
      .post(this.tripURL+formData.code,formData)
      .toPromise()
      .then(response=>response.json() as Trip[])
      .catch(this.handleError);
  }
  private handleError(error:any):Promise<any>{
    console.error('Something has gone wrong ',error);
    return Promise.reject(error.message||error);
  }

}
