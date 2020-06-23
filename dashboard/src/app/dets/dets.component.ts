import { Component, OnInit } from "@angular/core";
import * as CanvasJS from "../canvasjs.min";
import { ChartService } from "../chartservice.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-dets",
  templateUrl: "./dets.component.html",
  styleUrls: ["./dets.component.css"]
})
export class DetsComponent implements OnInit {
  value: Object;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    //Chart 1
    var dps = []; // dataPoints
    var chart = new CanvasJS.Chart("chartContainer", {
      title: {
        text: "Live Chart"
      },
      axisY: {
        includeZero: false
      },
      data: [
        {
          type: "line",
          dataPoints: dps
        }
      ]
    });

    var xVal = 0;
    var yVal = 100;
    var updateInterval = 1000;
    var dataLength = 20; // number of dataPoints visible at any point

    var updateChart = function(count) {
      count = count || 1;

      for (var j = 0; j < count; j++) {
        yVal = Math.floor(Math.random() * 100) + 1;
        dps.push({
          x: xVal,
          y: yVal
        });
        xVal++;
      }

      if (dps.length > dataLength) {
        dps.shift();
      }

      chart.render();
    };

    updateChart(dataLength);
    setInterval(function() {
      updateChart(0);
    }, updateInterval);
  }
}
