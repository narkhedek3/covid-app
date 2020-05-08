import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { throwError, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(public http: HttpClient) { }

  getDataByCountryName(countryName) {
    return this.http.get<any>('https://corona.lmao.ninja/v2/countries/' + countryName)
      .pipe(
        map(data => data),
        catchError(err => {
          throw new Error(err);
        })
      );
  }

}
