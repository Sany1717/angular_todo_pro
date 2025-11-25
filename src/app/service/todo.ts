import { Injectable } from '@angular/core';

export interface Todo {
  id: number;
  title: string;
  description?: string;
  done: boolean;
}

const STORAGE_KEY = 'angular_todo_pro_v1';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[] = [];

  constructor() {
    const data = localStorage.getItem(STORAGE_KEY);
    this.todos = data ? JSON.parse(data) : this.defaultData();
  }

  private defaultData(): Todo[] {
    const sample: Todo[] = [
      { id: 1, title: 'Learn Angular basics', description: 'Components, services, ngModel', done: false },
      { id: 2, title: 'Prepare interview questions', description: 'CRUD, lifecycle hooks', done: false },
    ];
    this.save(sample);
    return sample;
  }

  private save(data = this.todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  getAll() {
    return this.todos;
  }

  add(todo: Omit<Todo, 'id'>) {
    const id = this.todos.length ? Math.max(...this.todos.map(t => t.id)) + 1 : 1;
    this.todos.push({ id, ...todo });
    this.save();
  }

  update(id: number, todo: Omit<Todo, 'id'>) {
    const index = this.todos.findIndex(t => t.id === id);
    if (index !== -1) {
      this.todos[index] = { id, ...todo };
      this.save();
    }
  }

  delete(id: number) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.save();
  }

  toggle(id: number, done: boolean) {
    const t = this.todos.find(x => x.id === id);
    if (t) {
      t.done = done;
      this.save();
    }
  }
}
