import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoService, Todo } from './service/todo';
import { TodoForm } from './components/todo-form/todo-form';
import { TodoList } from './components/todo-list/todo-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodoForm, TodoList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 editing: Todo | null = null;

  constructor(public todoService: TodoService) {}

  handleSave(todo: Omit<Todo, 'id'>) {
    this.todoService.add(todo);
  }

  handleUpdate(e: { id: number; payload: Omit<Todo, 'id'> }) {
    this.todoService.update(e.id, e.payload);
    this.editing = null;
  }

  handleEdit(todo: Todo) {
    this.editing = { ...todo };
  }

  handleDelete(id: number) {
    if (confirm('Delete this todo?')) {
      this.todoService.delete(id);
      if (this.editing?.id === id) this.editing = null;
    }
  }

  handleToggle(e: { id: number; done: boolean }) {
    this.todoService.toggle(e.id, e.done);
  }

  cancelEdit() {
    this.editing = null;
  }
}
