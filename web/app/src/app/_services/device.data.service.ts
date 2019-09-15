import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DeviceData } from '../_models/devicedata';

@Injectable({ providedIn: 'root' })
export class DeviceDataService {
    private currentDeviceSubject: BehaviorSubject<DeviceData>;
    public currentDevice: Observable<DeviceData>;

    constructor(private http: HttpClient) {
        this.currentDeviceSubject = new BehaviorSubject<DeviceData>(JSON.parse(localStorage.getItem('currentDevice')));
        this.currentDevice = this.currentDeviceSubject.asObservable();
    }

    public get currentDeviceValue(): DeviceData {
        return this.currentDeviceSubject.value;
    }

    getData(deviceDataLog: DeviceData) {
        return this.http.post<any>(`api/devicedata`,  deviceDataLog )
            .pipe(map(device => {
                if(device) {
                    localStorage.setItem(`currentDevice`, JSON.stringify(device));
                    this.currentDeviceSubject.next(device);
                }
                return device;
            }))
    }
}