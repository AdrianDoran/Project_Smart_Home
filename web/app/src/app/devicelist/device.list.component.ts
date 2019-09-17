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
      var latString;
      var lonString;
      data.data.forEach(element => {latString += element.lat.toString + ","});
      data.data.forEach(element => {lonString += element.lon.toString + ","});

      var mapData = [{ 
        type: 'scattermapbox',
        lat: [latString],
        lon: [lonString],
        mode: 'markers',
        marker: { size: 14 },
        text: ['Autralia']
      }]
      var layout = {
        autosize: true,
        hovermode: 'closest',
        mapbox: {
          bearing: 0,
          center: {
            lat: data.data[length].lat,
            lon: data.data[length].lon
          },
          pitch: 0,
          zoom: 2
        },
      }
      Plotly.setPlotConfig({
        mapboxAccessToken: 'pk.eyJ1IjoiYWRvcmFuIiwiYSI6ImNrMGtjeG8zdTBrOTEzbW8zZnZzcXF3bXAifQ.WFTjF80_lvSOd9uroe6igw'
      })

      Plotly.plot('graph', mapData, layout) // graph is the DIV id on the HTML
    }
}