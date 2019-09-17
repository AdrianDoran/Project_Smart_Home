import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Device } from '../_models/device';

@Injectable({ providedIn: 'root' })
export class DeviceDataService {
    private currentDeviceSubject: BehaviorSubject<Device>;
    public currentDevice: Observable<Device>;

    constructor(private http: HttpClient) {
        this.currentDeviceSubject = new BehaviorSubject<Device>(JSON.parse(localStorage.getItem('currentDevice')));
        this.currentDevice = this.currentDeviceSubject.asObservable();
    }

    public get currentDeviceValue(): Device {
        return this.currentDeviceSubject.value;
    }

    getData(device: Device) {
        return this.http.post<any>(`api/devicedata`, device )
            .pipe(map(device => {
                if(device) {
                    localStorage.setItem(`currentDevice`, JSON.stringify(device));
                    this.currentDeviceSubject.next(device);
                }
                return device;
            }))
    }
}