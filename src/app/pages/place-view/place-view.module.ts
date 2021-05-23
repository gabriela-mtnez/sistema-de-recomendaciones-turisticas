import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PlaceViewComponent } from './place-view.component';


const routes: Routes = [
  { path: '', component: PlaceViewComponent }
];

@NgModule({
  declarations: [PlaceViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PlaceViewModule { }
