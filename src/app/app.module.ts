import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TopnavComponent } from './components/nav/topnav/topnav.component';

import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './components/charts/doughnut-chart/doughnut-chart.component';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { PolarAreaChartComponent } from './components/charts/polar-area-chart/polar-area-chart.component';

import { FooterComponent } from './components/nav/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TopnavComponent,
    LineChartComponent,
    BarChartComponent,
    DoughnutChartComponent,
    PieChartComponent,
    PolarAreaChartComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
