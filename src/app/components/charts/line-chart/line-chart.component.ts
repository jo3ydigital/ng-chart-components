import { Component, OnInit } from '@angular/core';
import { Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Chart } from 'chart.js';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  faRocket = faRocket;
  faBell = faBell;
  faClock = faClock;

  public canvas: any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;
  public chart: any;

  @Input() lc_data: Array<any> = [];
  @ViewChild("canvas") chartcanvas!: ElementRef;
  @ViewChild("icon") charticon!: ElementRef;

  public title: any;
  public myIcon: any = faRocket;
  public iconColor: any;
  public subTitle: any;

  constructor(private cdRef : ChangeDetectorRef) { }

  createChart() {
    this.title = this.lc_data[0].title;
    this.subTitle = this.lc_data[0].subtitle;
    this.iconColor = this.lc_data[0].iconColor;

    switch(this.lc_data[0].icon) {
      case 'faRocket': this.myIcon = faRocket; break;
      case 'faBell': this.myIcon = faBell; break;
      case 'faClock': this.myIcon = faClock; break;
      case 'none': this.myIcon = 'none'; break;
    }

    if(this.lc_data[0].displayGridLines_x === 'true') this.lc_data[0].displayGridLines_x = true;
    if(this.lc_data[0].displayGridLines_x === 'false') this.lc_data[0].displayGridLines_x = false;
    if(this.lc_data[0].displayGridLines_y === 'true') this.lc_data[0].displayGridLines_y = true;
    if(this.lc_data[0].displayGridLines_y === 'false') this.lc_data[0].displayGridLines_y = false;

    this.data = this.lc_data[0].chartData;
    this.canvas = this.chartcanvas.nativeElement;
    this.ctx = this.canvas.getContext("2d");

    let gradientStroke;

    if(this.lc_data[0].colorsAddColorStop === 'true') {
      gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
      gradientStroke.addColorStop(1, 'rgba('+this.lc_data[0].colors+',0.05)');
      gradientStroke.addColorStop(0.4, 'rgba('+this.lc_data[0].colors+',0.0)');
      gradientStroke.addColorStop(0, 'rgba('+this.lc_data[0].colors+',0)');
    } else {
      gradientStroke = 'rgba('+this.lc_data[0].colors+',0.1)';
    }

    let gradientChartOptionsConfigurationWithTooltipRed: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
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
            display: this.lc_data[0].displayGridLines_x,
            drawBorder: false,
            color: this.lc_data[0].gridLinesColor,
            zeroLineColor: this.lc_data[0].gridLinesColor,
          },
          ticks: {
            padding: 0,
            fontColor: "#9e9e9e"
          }
        }],
        yAxes: [{
          gridLines: {
            display: this.lc_data[0].displayGridLines_y,
            drawBorder: false,
            color: this.lc_data[0].gridLinesColor,
            zeroLineColor: this.lc_data[0].gridLinesColor,
          },
          ticks: {
            suggestedMin: this.lc_data[0].min,
            suggestedMax: this.lc_data[0].max,
            padding: 20,
            lineHeight: 1.5,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };

    this.chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
        datasets: [{
          label: "Shipments",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: this.lc_data[0].borderColor,
          borderWidth: 2,
          borderDash: this.lc_data[0].borderDash,
          borderDashOffset: 0.0,
          pointBackgroundColor: this.lc_data[0].pointBackgroundColor,
          pointBorderColor: this.lc_data[0].pointBackgroundColor,
          pointHoverBackgroundColor: this.lc_data[0].hoverColor,
          pointHoverBorderColor: this.lc_data[0].hoverColor,
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.data
        }]
      },
      options: gradientChartOptionsConfigurationWithTooltipRed
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
