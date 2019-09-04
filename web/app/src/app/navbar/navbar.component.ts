import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from '../_services';
import { User } from '../_models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})

export class NavBarComponent{
    currentUser: User;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService : AuthenticationService,
        private toastr: ToastrService
      ) { this.authenticationService.currentUser.subscribe(x => this.currentUser = x );}

      logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
      }

}