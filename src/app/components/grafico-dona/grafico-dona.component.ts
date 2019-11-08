import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input('grafica')grafica:any;
  // @Input('labels') labels:any = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  // @Input('datos') datos:any = [8, 50, 10];
  // @Input('chartipo') chartipo:any = 'doughnut';

  // Doughnut
  public doughnutChartLabels: Label[] ;
  public doughnutChartData: number[] ;
  public doughnutChartType: ChartType ;
  public leyenda:string;
  constructor() { }

  
  ngOnInit() {
    
    this.recibirValores();
  }

recibirValores(){
  this.doughnutChartLabels = this.grafica.labels;
  this.doughnutChartData = this.grafica.data;
  this.doughnutChartType = this.grafica.type;
  this.leyenda = this.grafica.leyenda;
}


}
