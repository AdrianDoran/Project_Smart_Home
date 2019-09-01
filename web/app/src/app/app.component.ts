import { Component, NgModule } from '@angular/core';
import { HttpClient} from '@angular/common/http';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  user= {
    username: "null",
    password: "null"
  }
  json;
  authenticate(username, password){ 
    this.user.password = password;
    this.user.username = username;}
    constructor(private http: HttpClient,){
      this.http.post("localhost:5000/api/authenticate", JSON.stringify(this.user)).toPromise().then((data:any) =>  {
        console.log(data)
        this.json = JSON.stringify(data.json);
      });
    }
    
    
}
