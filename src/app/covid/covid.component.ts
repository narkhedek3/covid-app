import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CovidService } from '../covid.service';
import { LocalDataSource } from 'ng2-smart-table';

import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.scss']
})
export class CovidComponent implements OnInit, AfterViewInit {

  country: string;
  countryWiseData;
  errorMsg;

  totalData: any = [];
  displayTable = false;
  source = new LocalDataSource([]);
  settings = {
    actions: {
      delete: false,
      edit: false,
      add: false
    },
    pager: {
      display: false
    },
    columns: {
      country: {
        title: 'Country'
      },
      cases: {
        title: 'Cases',
        sortDirection: 'desc'
      },
      active: {
        title: 'Active'
      },
      recovered: {
        title: 'Recovered'
      },
      deaths: {
        title: 'Deaths'
      },
      tests: {
        title: 'Tests'
      }
    },
    attr: {
      class: 'table table-bordered'
    }
  };


  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [];

  constructor(public covidService: CovidService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.covidService.getDataByCountryName('').subscribe(data => {
      this.displayTable = true;
      data.map((countryData) => {
        const { country, cases, active, recovered, deaths, tests } = countryData;
        const temp = { country, cases, active, recovered, deaths, tests };
        this.totalData.push(temp);
        this.source.add(temp);
      });
    }, err => {
    });
  }

  search() {

    this.covidService.getDataByCountryName(this.country).subscribe(data => {
      this.countryWiseData = data;
      const { cases, active, recovered, deaths, tests } = data;
      this.errorMsg = undefined;
      this.pieChartLabels = ['cases', 'active', 'recovered', 'deaths', 'tests'];
      const total = cases + active + recovered + deaths + tests;
      this.pieChartData = [
        (cases / total) * 100,
        (active / total) * 100,
        (recovered / total) * 100,
        (deaths / total) * 100,
        (tests / total) * 100
      ];
      this.pieChartColors = [{ backgroundColor: ['blue', 'orange', 'green', 'red', 'gray'] }];
    }, err => {
      this.errorMsg = 'Not available in database';
      this.countryWiseData = undefined;
    });
  }

}
