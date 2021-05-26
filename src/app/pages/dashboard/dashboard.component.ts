import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../services/chart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // LINE CHARTS
  lc_data;
  lc_hard_gradient_data;
  lc_multicolored_data;
  lc_dashed_data;

  // BAR CHARTS
  bc_data;
  bc_data2;

  // CIRCULAR CHARTS
  dc_data;
  pc_data;
  pac_data;

  // HORIZONTAL BAR CHART
  bch_Data;

  constructor(public ChartService: ChartService) {

  }

  // LINE CHARTS - (all 4 use the same line chart component)
  populateLineChart() {
    let _sub = this.ChartService.getChartData('charts-line.json')
    .subscribe(
      data => { this.lc_data = data; },
      error => { console.log('error: '+error); },
      () => { _sub.unsubscribe(); }
    );
  }
  populateLineChartHardGradient() {
    let _sub = this.ChartService.getChartData('charts-line-hard-gradient.json')
    .subscribe(
      data => { this.lc_hard_gradient_data = data; },
      error => { console.log('error: '+error); },
      () => { _sub.unsubscribe(); }
    );
  }
  populateLineChartMulticolored() {
    let _sub = this.ChartService.getChartData('charts-line-multicolor.json')
    .subscribe(
      data => { this.lc_multicolored_data = data; },
      error => { console.log('error: '+error); },
      () => { _sub.unsubscribe(); }
    );
  }
  populateLineChartDashed() {
    let _sub = this.ChartService.getChartData('charts-line-dashed.json')
    .subscribe(
      data => { this.lc_dashed_data = data; },
      error => { console.log('error: '+error); },
      () => { _sub.unsubscribe(); }
    );
  }

  // BAR CHARTS - (all 3 use the same bar chart component)
  populateBarChart() {
    let _sub = this.ChartService.getChartData('charts-bar.json')
    .subscribe(
      data => { this.bc_data = data; },
      error => { console.log('error: '+error); },
      () => { _sub.unsubscribe(); }
    );
  }
  populateBarChart2() {
    let _sub = this.ChartService.getChartData('charts-bar2.json')
    .subscribe(
      data => { this.bc_data2 = data; },
      error => { console.log('error: '+error); },
      () => { _sub.unsubscribe(); }
    );
  }
  populateBarChartHoriz() {
    let _sub = this.ChartService.getChartData('charts-bar-horiz.json')
    .subscribe(
      data => { this.bch_Data = data; },
      error => { console.log('error: '+error); },
      () => { _sub.unsubscribe(); }
    );
  }

  // CIRCULAR CHARTS
  populateDoughnutChart() {
    let _sub = this.ChartService.getChartData('charts-doughnut.json')
    .subscribe(
      data => { this.dc_data = data; },
      error => { console.log('error: '+error); },
      () => { _sub.unsubscribe(); }
    );
  }
  populatePieChart() {
    let _sub = this.ChartService.getChartData('charts-pie.json')
    .subscribe(
      data => { this.pc_data = data; },
      error => { console.log('error: '+error); },
      () => { _sub.unsubscribe(); }
    );
  }
  populatePolarAreaChart() {
    let _sub = this.ChartService.getChartData('charts-polar-area.json')
    .subscribe(
      data => { this.pac_data = data; },
      error => { console.log('error: '+error); },
      () => { _sub.unsubscribe(); }
    );
  }


  // IntersectionObserver FOR HEADER DROP SHADOW
  observeHeader() {
    const headerBG = <HTMLElement>document.querySelector('.header-bg');
    const headerBottShadow = <HTMLElement>document.querySelector('.drop-shadow-header-bottom');
    const main = <HTMLElement>document.querySelector('.component-heading');
    
    const main_options = {
      rootMargin: "-110px 0px 0px 0px"
    };

    const header_observer = new IntersectionObserver (function(entries, header_observer) {
      entries.forEach(entry => {
        if(!entry.isIntersecting) {
          headerBottShadow.classList.add("nav-scrolled"); headerBG.classList.add("hide");
        } else {
          headerBottShadow.classList.remove("nav-scrolled"); headerBG.classList.remove("hide");
        }
      });
    }, main_options);

    header_observer.observe(main)
  }
  
  ngOnInit(): void {
    this.observeHeader();

    this.populateLineChart();
    this.populateLineChartHardGradient();
    this.populateLineChartMulticolored();
    this.populateLineChartDashed();

    this.populateBarChart();
    this.populateBarChart2();
    this.populateBarChartHoriz();

    this.populateDoughnutChart();
    this.populatePieChart();
    this.populatePolarAreaChart();
  }

}
