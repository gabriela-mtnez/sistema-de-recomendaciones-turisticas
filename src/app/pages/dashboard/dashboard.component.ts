import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PlacesService } from 'src/app/app/services/places.service';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [AuthService, PlacesService],
})
export class DashboardComponent implements OnInit {

  constructor(private authSvc:AuthService, private placesSvc:PlacesService) {}

  // public datasets: any;
  // public data: any;
  // public salesChart;
  // public clicked: boolean = true;
  // public clicked1: boolean = false;

  ngOnInit() {

    // this.datasets = [
    //   [0, 20, 10, 30, 15, 40, 20, 60, 60],
    //   [0, 20, 5, 25, 10, 30, 15, 40, 40]
    // ];
    // this.data = this.datasets[0];


    // var chartOrders = document.getElementById('chart-orders');

    // parseOptions(Chart, chartOptions());


    // var ordersChart = new Chart(chartOrders, {
    //   type: 'bar',
    //   options: chartExample2.options,
    //   data: chartExample2.data
    // });

    // var chartSales = document.getElementById('chart-sales');

    // this.salesChart = new Chart(chartSales, {
		// 	type: 'line',
		// 	options: chartExample1.options,
		// 	data: chartExample1.data
		// });
  }


  // public updateOptions() {
  //   this.salesChart.data.datasets[0].data = this.data;
  //   this.salesChart.update();
  // }

  async descubrirLugares(){
    const user = this.authSvc.getUserProfile();
    const places = await this.authSvc.getUserPlaces(user["email"]);
    var selectedPlacesId = places["data"]["selectedPlaces"];
    var selectedPlacesInfo = []
    for (let i = 0; i < selectedPlacesId.length; i++){
      let place = await this.placesSvc.getPlacesById(selectedPlacesId[i]["idLugar"]);
      if(place["tipoLugar"] == "Museo" || place["tipoLugar"] == "Sitio arqueológico"){
        selectedPlacesInfo.push({"lugar" : "Museos y sitios arqueológicos: [" + place["nombreLugar"] + "]", "rating": selectedPlacesId[i]["rating"]});
      } else {
        selectedPlacesInfo.push({"lugar" : "Restaurantes: [" + place["nombreLugar"] + "]", "rating": selectedPlacesId[i]["rating"]});
      }
    }
    console.log(selectedPlacesInfo);
    //De aquí falta llamar al servicio mediante un POST y enviarle por body selectedPlacesInfo
  }

}
