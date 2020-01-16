import { Component, OnInit } from '@angular/core';
import { Items } from '../items';
import {TodoserviceService} from '../todoservice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],

})
export class TodoItemComponent implements OnInit {

  constructor(private todoService: TodoserviceService, private router: Router) { }
  selectedItem:Items = new Items();

  ngOnInit() {
    this.todoService.currentItem$.subscribe(res => this.selectedItem = res);
  }

  back(){
    this.router.navigate(['']);
  }

  updateItem(){
    console.log("Updating items"+this.selectedItem.details);
    this.todoService.updateItem(this.selectedItem).subscribe(
    );;
  }

}
