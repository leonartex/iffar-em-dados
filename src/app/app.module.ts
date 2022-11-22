import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarChartComponent } from './components/graphs/bar-chart/bar-chart.component';
import { CoursePageComponent } from './components/pages/course-page/course-page.component';
import { UnitPageComponent } from './components/pages/unit-page/unit-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { CardComponent } from './components/elements/card/card.component';
import { ContentBarComponent } from './components/elements/content-bar/content-bar.component';
import { CoursesInfoComponent } from './components/elements/courses-info/courses-info.component';
import { ProjectsInfoComponent } from './components/elements/projects-info/projects-info.component';
import { EntryAndProgressInfoComponent } from './components/elements/entry-and-progress-info/entry-and-progress-info.component';
import { StudentsProfileInfoComponent } from './components/elements/students-profile-info/students-profile-info.component';
import { TestComponent } from './components/aux/test/test.component';

import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { DoughnutChartComponent } from './components/graphs/doughnut-chart/doughnut-chart.component';
import { HeaderComponent } from './components/elements/header/header.component';
import { LogoSvgComponent } from './components/elements/logo-svg/logo-svg.component';
import { UnitsMapComponent } from './components/elements/units-map/units-map.component';
import { CourseDetailingComponent } from './components/elements/course-detailing/course-detailing.component';

@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    CoursePageComponent,
    UnitPageComponent,
    HomePageComponent,
    CardComponent,
    ContentBarComponent,
    CoursesInfoComponent,
    ProjectsInfoComponent,
    EntryAndProgressInfoComponent,
    StudentsProfileInfoComponent,
    TestComponent,
    DoughnutChartComponent,
    HeaderComponent,
    LogoSvgComponent,
    UnitsMapComponent,
    CourseDetailingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [
    { provide: NgChartsConfiguration, useValue: { generateColors: true }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
