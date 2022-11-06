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
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
