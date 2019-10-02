import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Device } from '../_models/device';
import { DeviceDataService } from '../_services/device.data.service';
import * as Plotly from 'plotly.js-mapbox-dist';
import { DeviceService } from '../_services';
@Component({
    selector: 'app-devicelist',
    templateUrl: './device.list.component.html'
})
export class DeviceListComponent implements OnInit {
    public userDevices;
    public currentUser; // Possibly display we are still logged?
    public currentDevice;
    public deviceID;
    public deviceType;
    public deviceDataLog;
    public mapboxgl;
    public cardNames;

    constructor(
        private router: Router,
        private deviceDataService: DeviceDataService,
        private toastr: ToastrService,
        private deviceService: DeviceService
    ) {
        // Possibly use the stored device we want instead of using the whole set of devices.
        this.userDevices = JSON.parse(localStorage.getItem('userDevices'));
        this.currentUser =  JSON.parse(localStorage.getItem('currentUser'));
        this.currentDevice = JSON.parse(localStorage.getItem('currentDevice'));
    }

    ngOnInit() {

        this.deviceDataService.getData(this.currentDevice)
        .subscribe(
          data => {
            this.toastr.success("Data retreived.");
            // Work with data here.
            this.deviceDataLog = data;
            this.mapChart(this.deviceDataLog);
          },
          error => {
            this.toastr.info("Couldn't get device data.");
          });

  

    }
    public mapChart(data: Device) { 
      var latArr = [{}];
      var lonArr = [{}];
      var textArr = [{}];
      data.data.forEach(element => {latArr.push(element.lat)});
      data.data.forEach(element => {lonArr.push(element.lon)});
      data.data.forEach(element => {textArr.push("Card: " + element.cardID + " " + element.entry + " " + this.deviceDataService.getName(element.cardID))});
      var mapData = [{ 
        type: 'scattermapbox',
        lat: latArr,
        lon: lonArr,
        mode: 'lines',
        marker: { size: 15 },
        text: textArr
      }]
      var layout = {
        autosize: true,
        hovermode: 'closest',
        mapbox: {
          bearing: 0,
          zoom: 5,
          center: {
            lat: data.data[length].lat,
            lon: data.data[length].lon
          },
          style: 'dark',
        },
        margin: {
          r: 0,
          t: 0,
          b: 0,
          l: 0,
          pad: 0
        },
        paper_bgcolor: '#191A1A',
        plot_bgcolor: '#191A1A',
        showlegend: false,
          breakpoints: [],
          pitch: 0,
          zoom: 0
      }
      Plotly.setPlotConfig({
        mapboxAccessToken: 'pk.eyJ1IjoiYWRvcmFuIiwiYSI6ImNrMGtjeG8zdTBrOTEzbW8zZnZzcXF3bXAifQ.WFTjF80_lvSOd9uroe6igw'
      })

      Plotly.plot('graph', mapData, layout, { responsive: true }) // graph is the DIV id on the HTML
    }
}


