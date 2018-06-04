import { Injectable } from '@angular/core';
import { ToDo } from '../types/to-do.types';
@Injectable()
export class ToDoService {
  constructor() { }
  public thingsToDo: Array<ToDo> = [];
}
