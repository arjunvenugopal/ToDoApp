import { Injectable } from '@angular/core';
import {Items} from './items';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject} from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';


const API_URL: string = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class TodoserviceService {
  currentid: number = 0;
  private selectedItem = new BehaviorSubject<Items>(new Items());
  currentItem$ = this.selectedItem.asObservable();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  constructor(private http: HttpClient) { }

  updateCurrentItem(item: Items){
    this.selectedItem.next(item);
  }

  addItem(item: Items): Observable<Items>{ 
    return this.http.post(API_URL+"/additem",item).pipe(map(response =>{
        return new Items(response)}, error => console.log("Error While Adding", error)));
    
  }

  removeItem(item: Items): Observable<null>{
    return this.http.post(API_URL+"/removeitem", item, this.httpOptions).pipe(map(response =>{
      console.log("Response while removing ", response);
      return null;
  }));
  }

  updateItem(item: Items):Observable<Items> {
    return this.http.post(API_URL + '/updateitem', item, this.httpOptions).pipe(map(result=>{ 
      return new Items(result);
    }, error => console.log(error)));
  }
    
  getAllItems(): Observable<Items[]>{
      return this.http.post(API_URL + '/getallitems', this.httpOptions).pipe(map(result=>{
        return <Items[]> result;
      }, error => console.log(error)));
    }
  
    toggleStatus(item: Items):Observable<Items>{
      item.completed = !item.completed;
      return this.http.post(API_URL + '/updateitem', item, this.httpOptions).pipe(map(result=>{ 
        return new Items(result);
      }, error => console.log(error)));
    }
    
}
