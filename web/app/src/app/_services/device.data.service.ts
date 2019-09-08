import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DeviceData } from '../_models/devicedata';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  constructor(private http: HttpClient) { }

  retrieve(id: DeviceData) {
      return this.http.post(`api/devicedata`, id);
    }
  }