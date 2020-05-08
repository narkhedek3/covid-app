import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customAsync'
})
export class CustomAsyncPipe implements PipeTransform {

  asynchData: any;
  subcription;


  transform(value: any, ...args: any[]): any {
    if (this.subcription === undefined) {
      this.subcription = value;
      this.start(value);
    }
    return this.asynchData;
  }

  start(subcription) {
    if (typeof subcription.subscribe === 'function') {
      subcription.subscribe(data => {
        this.asynchData = data;
        this.transform(data);
      }, (err) => {
        this.asynchData = err;
        this.transform(err);
      });
    }
  }

}
