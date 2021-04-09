import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent } from './survey.component';


const routes: Routes = [
  { path: '', component: SurveyComponent }
];

@NgModule({
  declarations: [SurveyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SurveyModule { }
