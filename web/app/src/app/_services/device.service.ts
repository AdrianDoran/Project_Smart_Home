import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Device } from '../_models/device';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  constructor(private http: HttpClient) { }

  register(device: Device) {
      return this.http.post(`api/adddevice`, device);
    }
  setCard(any) {
    return this.http.post(`api/addcard`, any);
  }
  }