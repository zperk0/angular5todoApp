import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../../services/to-do.service';
@Component({
  selector: 'app-to-do-form',
  templateUrl: './to-do-form.component.html',
  styleUrls: ['./to-do-form.component.css']
})
export class ToDoFormComponent implements OnInit {
  public todoTitle:string;
  public todoDescription:string;
  public submitTodo(){
    const newTodo = {
      title: this.todoTitle,
      description: this.todoDescription,
      done: false
    }
    this.todoService.thingsToDo.push(newTodo);
    this.todoTitle = '';
    this.todoDescription = '';
    console.log(this.todoService.thingsToDo);
  }
  constructor(private todoService: ToDoService) { }
  ngOnInit() {
  }

}
