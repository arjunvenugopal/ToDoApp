import { Component, OnInit } from '@angular/core';
import { TodoserviceService} from './todoservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoserviceService]
})
export class AppComponent implements OnInit {

  ngOnInit(){
    this.router.navigate(['']);
  }
  
  constructor(
    private todoService: TodoserviceService, private router: Router
  ) {
  }
}
