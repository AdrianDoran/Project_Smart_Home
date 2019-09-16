import { Component } from '@angular/core';
import { AuthenticationService } from '../_services';
import { User } from '../_models';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent{
    today: number = Date.now();
    currentUser: User;
    constructor(
        private authenticationService: AuthenticationService,
        private toastr: ToastrService
    ) { 
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
    }
}