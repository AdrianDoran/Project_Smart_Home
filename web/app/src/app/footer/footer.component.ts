import { Component } from '@angular/core';
import { AuthenticationService } from '../_services';
import { User } from '../_models';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent{
    today: number = Date.now();
    currentUser: User;
    constructor(
        private authenticationService: AuthenticationService
    ) { this.authenticationService.currentUser.subscribe(x => this.currentUser = x);}
}