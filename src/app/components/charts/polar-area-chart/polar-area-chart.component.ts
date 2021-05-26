import { Component, OnInit } from '@angular/core';
import { Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Chart } from 'chart.js';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-polar-area-chart',
  templateUrl: './polar-area-chart.component.html',
  styleUrls: ['./polar-area-chart.component.scss']
})
export class PolarAreaChartComponent implements OnInit {
  faGlobe = faGlobe;
  faGlobeAmericas = faGlobeAmericas;
  faFlag = faFlag;

  public canvas: any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;
  public chart: any;

  @Input() pa_data: Array<any> = [];
  @ViewChild("canvas") chartcanvas!: ElementRef;
  @ViewChild("icon") charticon!: ElementRef;

  public title: any;
  public myIcon: any = faFlag;
  public iconColor: any;
  public subTitle: any;

  constructor(private cdRef : ChangeDetectorRef) { }

  createChart() {
    this.title = this.pa_data[0].title;
    this.subTitle = this.pa_data[0].subtitle;
    this.iconColor = this.pa_data[0].iconColor;

    switch(this.pa_data[0].icon) {
      case 'faGlobe': this.myIcon = faGlobe; break;
      case 'faGlobeAmericas': this.myIcon = faGlobeAmericas; break;
      case 'faFlag': this.myIcon = faFlag; break;
      case 'none': this.myIcon = 'none'; break;
    }

    this.data = this.pa_data[0].chartData;
    this.canvas = this.chartcanvas.nativeElement;
    this.ctx = this.canvas.getContext("2d");

    let gradientStroke: Array<any> = [];
    let gradientStrokeHover: Array<any> = [];
    for(let i=0; i < this.pa_data[0].bgColors.length; i++) {
      gradientStroke[i] = this.ctx.createLinearGradient(0, 230, 0, 50);
      gradientStroke[i].addColorStop(1, 'rgba('+this.pa_data[0].bgColors[i]+',0.7)');
      gradientStroke[i].addColorStop(0.4, 'rgba('+this.pa_data[0].bgColors[i]+',0.2)');
      gradientStroke[i].addColorStop(0, 'rgba('+this.pa_data[0].bgColors[i]+',0.1)');

      gradientStrokeHover[i] = this.ctx.createLinearGradient(0, 230, 0, 50);
      gradientStrokeHover[i].addColorStop(0, 'rgba('+this.pa_data[0].bgColors[i]+',0.9)');
    }

    let chartConfig: any = {
      animation: {
        animateScale: true,
        animateRotate: true
      },
      legend: {
        display: true,
        position: 'left'
      },
      title: {
        display: false,
        text: 'Chart.js Polar Area Chart'
      },
      scale: {
        ticks: {
          display: false
        },
        gridLines: {
          color: 'rgba(82,95,127, 0.1)',
          lineWidth: 1
        }
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
        position: "nearest",

        callbacks: {
          label: function(tooltipItem, data) {
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var meta = dataset._meta[Object.keys(dataset._meta)[0]];
            var total = meta.total;
            var currentValue = dataset.data[tooltipItem.index];
            var percentage = parseFloat((currentValue/total*100).toFixed(1));
            return currentValue + ' units (' + percentage + '%)';
          },
          title: function(tooltipItem, data) {
            return data.labels[tooltipItem[0].index];
          }
        }

      },
      responsive: true,
    };

    this.chart = new Chart(this.ctx, {
      type: 'polarArea',
      data: {
        labels: this.pa_data[0].labels,
        datasets: [{
          data: this.data,
          borderWidth: .5,
          borderColor: this.pa_data[0].borderColor,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStrokeHover
        }]
      },
      options: chartConfig,
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