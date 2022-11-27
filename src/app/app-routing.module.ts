import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursePageComponent } from './components/pages/course-page/course-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { UnitPageComponent } from './components/pages/unit-page/unit-page.component';

const routes: Routes = [
  { path: ':campus/:courseName/:courseId', component: CoursePageComponent },
  { path: ':campus/:courseName', component: UnitPageComponent }, //Se só vem o nome do curso, levar pro campus onde busca-se o curso
  { path: ':campus', component: UnitPageComponent },
  { path: '', component: HomePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
