import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromIngrsoEgreso from '../ingreso-egreso.reducer'
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  public doughnutChartLabels: Label[] = ['Egresos', 'Ingresos'];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData: number[] = [];

  ingreso: number;
  egreso: number;
  cuantosIngresos: number;
  cuantosEgresos: number;
  estadisticaSuscription: Subscription = new Subscription();

  constructor(private store: Store<fromIngrsoEgreso.AppState>) { }

  ngOnInit() {
    this.estadisticaSuscription = this.store.select('ingresoEgreso')
      .subscribe(ingresoEgreso => {
        this.contarIngresoEgreso(ingresoEgreso.items);
      })
  }

  contarIngresoEgreso(items: IngresoEgreso[]) {
    this.ingreso = 0;
    this.egreso = 0;
    this.cuantosEgresos = 0;
    this.cuantosIngresos = 0;
    items.forEach(item => {
      if (item.tipo === 'ingreso') { this.cuantosIngresos++; this.ingreso += item.monto }
      else {
        this.cuantosEgresos++; this.egreso += item.monto
      }
    });
    this.doughnutChartData = [this.egreso, this.ingreso]
  }
}
