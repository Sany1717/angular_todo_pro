import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../service/todo';
@Component({
  selector: 'app-todo-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
   @Input() editing: Todo | null = null;
  @Output() save = new EventEmitter<Omit<Todo, 'id'>>();
  @Output() update = new EventEmitter<{ id: number; payload: Omit<Todo, 'id'> }>();
  @Output() cancel = new EventEmitter<void>();

  title = '';
  description = '';
  done = false;

  ngOnChanges() {
    if (this.editing) {
      this.title = this.editing.title;
      this.description = this.editing.description ?? '';
      this.done = this.editing.done;
    }
  }

  submit() {
    if (!this.title.trim()) {
      alert('Title is required');
      return;
    }

    const payload = {
      title: this.title.trim(),
      description: this.description.trim(),
      done: this.done
    };

    if (this.editing) {
      this.update.emit({ id: this.editing.id, payload });
    } else {
      this.save.emit(payload);
    }

    this.reset();
  }

  reset() {
    this.title = '';
    this.description = '';
    this.done = false;
  }

  cancelEdit() {
    this.reset();
    this.cancel.emit();
  }
}