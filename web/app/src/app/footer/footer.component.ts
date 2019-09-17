import { Component } from '@angular/core';
import { AuthenticationService } from '../_services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent{
    today: number = Date.now();
    public currentUser;
    public date;
    public dL;

    constructor(
        private authenticationService: AuthenticationService,
        private toastr: ToastrService
    ) { 
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
        this.date = this.currentUser.datetime;
    //     var arrayLength = this.date.length-1;
    //     localStorage.setItem('lastLoginNumber', JSON.stringify(arrayLength));
    //     this.dL = localStorage.getItem('lastLoginNumber') ? JSON.parse(localStorage.getItem('lastLoginNumber')) : '';
    }
}