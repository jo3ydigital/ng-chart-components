import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {map, catchError} from "rxjs/operators";
import { Observable, throwError } from 'rxjs';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) {}

  getChartData(file) {
    return this.http.get(environment.data_path+'/data/charts/'+file)
      .pipe(
        catchError((res:Response) => throwError(this.handleError(res)))
      )
  }

  //== Error Handling
  handleError(error) {
    console.log('SERVER ERROR FROM API: '+error);
    return Observable.throw(error || 'Server error');
  }
}
