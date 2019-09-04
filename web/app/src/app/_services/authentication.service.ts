import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User, Device } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public currentDeviceSubject: BehaviorSubject<Device>;
    public currentDevices: Observable<Device>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.currentDeviceSubject = new BehaviorSubject<Device>(JSON.parse(localStorage.getItem(`currentDevices`)));
        this.currentDevices = this.currentDeviceSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public get currentUserDevices(): Device {
        return this.currentDeviceSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`api/authenticate`, { email, password })
            .pipe(map(user => {
                if (user) {
                    // store user details in local storage to keep user logged in
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user data from local storage for log out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    getDevices(email: string) {
        return this.http.post<any>(`api/devices`, {email})
            .pipe(map(devices => {
                if(devices) {
                    localStorage.setItem(`userDevices`, JSON.stringify(devices));
                    this.currentDeviceSubject.next(devices);
                }

                return devices;
            }))
    }
}