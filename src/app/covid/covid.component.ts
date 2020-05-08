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

  constructor(public covidService: CovidService) { }

  ngOnInit() {
  }

  search() {
    this.covidService.getDataByCountryName(this.country).subscribe(data => {
      this.countryWiseData = data;
    }, err => {
      console.log(err);
    });
  }

}
