import { Component, OnInit } from '@angular/core';
import { CovidService } from '../covid.service';

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.scss']
})
export class CovidComponent implements OnInit {

  country: string;
  countryWiseData;
  errorMsg;

  constructor(public covidService: CovidService) { }

  ngOnInit() {
  }

  search() {
    this.covidService.getDataByCountryName(this.country).subscribe(data => {
      this.countryWiseData = data;
      this.errorMsg = undefined;
    }, err => {
      this.errorMsg = 'Not available in database';
      this.countryWiseData = undefined;
    });
  }

}
