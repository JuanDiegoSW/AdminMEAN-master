import { Component } from '@angular/core';
import { TestService } from '../../services/test.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  constructor( private array:TestService){}

  public labels: string[] = [];
  public data = [];

  public labels1: string[] = ['Appleton', 'Rushkaya', 'Ron Cartavio'];
  public data1 = [ [10, 12, 8], ];

  public labels2: string[] = ['Appleton', 'Rushkaya', 'Ron Cartavio'];
  public data2 = [ [15, 12, 3], ];
  ngOnInit(){
    this.array.test().subscribe(data => {

    });
  }
}
