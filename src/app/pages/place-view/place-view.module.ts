import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PlaceViewComponent } from './place-view.component';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', component: PlaceViewComponent }
];

@NgModule({
  declarations: [PlaceViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class PlaceViewModule { }
