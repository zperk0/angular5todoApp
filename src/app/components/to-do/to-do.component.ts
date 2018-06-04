import { Component, OnInit, Input } from '@angular/core';
import { ToDo } from '../../types/to-do.types';
@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  @Input() itemTodo: ToDo;
  constructor() { }
  ngOnInit() {
  }

}
