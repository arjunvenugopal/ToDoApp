import { Component, OnInit } from '@angular/core';
import {TodoserviceService} from '../todoservice.service';
import {Items} from '../items';
import {Router} from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  private todoService: TodoserviceService;
  newItem: Items = new Items();
  itemlist: Items[] = [];

  constructor(todoService: TodoserviceService, private router: Router) {
    this.todoService = todoService;
  }

  public ngOnInit() {
    this.refreshItemList();
  }

  refreshItemList(){
    this.todoService
    .getAllItems()
    .subscribe(
      (Item) => {
        this.itemlist = Item;
      }
    );
  }

  addItem() {
    this.todoService.addItem(this.newItem).subscribe(
      (newItem)=>{
        
        this.newItem = new Items();
        this.refreshItemList();
      }
    );
  }

  toggleStatus(Item: Items) {
    this.todoService
    .toggleStatus(Item)
    .subscribe(
    );
  }

  removeItem(item) {
    this.todoService.removeItem(item).subscribe(
      (result) => {this.refreshItemList();}
    );
    ;
  }

  openItem(item:Items){
    this.todoService.updateCurrentItem(item);
    this.router.navigate(['item']);
  }
}
