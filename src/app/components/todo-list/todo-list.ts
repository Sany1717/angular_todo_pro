import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../service/todo';
@Component({
  selector: 'app-todo-list',
  imports: [CommonModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {

   @Input() todos: Todo[] = [];
  @Output() edit = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<number>();
  @Output() toggle = new EventEmitter<{ id: number; done: boolean }>();
}
