import { Component } from '@angular/core';
import { ToDoService } from './services/to-do.service'; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public toDoService: ToDoService){}
  title = 'app';
  public returnDoneItems(){
    return this.toDoService.thingsToDo.filter(item => item.done);
  }
  public returnUndoneItems(){
    console.log('called');
    return this.toDoService.thingsToDo.filter(item => !item.done);
  }
}
