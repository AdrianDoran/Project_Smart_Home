import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';

/**Componenets */
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AddDeviceComponent } from './adddevice/add.device.component';
import { DeviceListComponent } from './devicelist/device.list.component';
import { AddCardComponent } from './newcard/add.card.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'register', 
    component: RegisterComponent 
  },
  { 
    path: 'adddevice', 
    component: AddDeviceComponent 
  },
  {
    path: 'devicelist',
    component: DeviceListComponent
  },
  {
    path: 'addcard',
    component: AddCardComponent
  },

  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }