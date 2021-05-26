import { Component, OnInit } from '@angular/core';
import { Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Chart } from 'chart.js';

import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { faTasks } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  faPaperPlane = faPaperPlane;
  faHandHoldingUsd = faHandHoldingUsd;
  faTruck = faTruck;
  faTasks = faTasks;

  public canvas: any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;
  public chart: any;

  @Input() bc_data: Array<any> = [];
  @ViewChild("canvas") chartcanvas!: ElementRef;
  @ViewChild("icon") charticon!: ElementRef;

  public title: any;
  public myIcon: any = faHandHoldingUsd;
  public iconColor: any;
  public subTitle: any;

  constructor(private cdRef : ChangeDetectorRef) { }

  createChart() {
    this.title = this.bc_data[0].title;
    this.subTitle = this.bc_data[0].subtitle;
    this.iconColor = this.bc_data[0].iconColor;

    switch(this.bc_data[0].icon) {
      case 'faPaperPlane': this.myIcon = faPaperPlane; break;
      case 'faTruck': this.myIcon = faTruck; break;
      case 'faTasks': this.myIcon = faTasks; break;
      case 'faHandHoldingUsd': this.myIcon = faHandHoldingUsd; break;
      case 'none': this.myIcon = 'none'; break;
    }

    this.data = this.bc_data[0].chartData;
    this.canvas = this.chartcanvas.nativeElement;
    this.ctx = this.canvas.getContext("2d");

    let gradientStroke;

    if(this.bc_data[0].colorsAddColorStop === 'false') {
      gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
      gradientStroke.addColorStop(1, 'rgba('+this.bc_data[0].colors+',0.1)');
      gradientStroke.addColorStop(0.4, 'rgba('+this.bc_data[0].colors+',0.0)');
      gradientStroke.addColorStop(0, 'rgba('+this.bc_data[0].colors+',0)');
    } else {
      gradientStroke = 'rgba('+this.bc_data[0].colors+',0.1)';
    }

    let gradientBarChartConfiguration: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        displayColors: true,
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        xAxes: [{
          gridLines: {
            drawBorder: false,
            color: this.bc_data[0].gridLinesColor,
            zeroLineColor: this.bc_data[0].gridLinesColor,
          },
          ticks: {
            padding: 0,
            fontColor: "#9e9e9e"
          }
        }],
        yAxes: [{
          gridLines: {
            drawBorder: false,
            color: this.bc_data[0].gridLinesColor,
            zeroLineColor: this.bc_data[0].gridLinesColor,
          },
          ticks: {
            suggestedMin: this.bc_data[0].min,
            suggestedMax: this.bc_data[0].max,
            padding: 20,
            lineHeight: 1.5,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };

    this.chart = new Chart(this.ctx, {
      type: this.bc_data[0].type,
      data: {
        labels: this.bc_data[0].labels,
        datasets: [{
          label: "Units",
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: this.bc_data[0].hoverColor,
          borderColor: this.bc_data[0].borderColor,
          borderWidth: 2,
          data: this.data
        }]
      },
      options: gradientBarChartConfiguration
    });
    this.updateOptions();
  }

  public updateOptions() {
    this.chart.update();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    window.setTimeout(() => {
      this.createChart();
    }, 1000)
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

}
