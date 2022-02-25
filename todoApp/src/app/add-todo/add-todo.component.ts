import { AddToDO } from './../interfaces/addTodo';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent{
  @Output() submitted = new EventEmitter<{}>();
  addForm = new FormGroup({
    text: new FormControl('')
  });

  addTodo(e){
    e.preventDefault();
    let i = 0;
    const addTodo:AddToDO = {
      text: this.addForm.get('text').value,
      date: new Date(),
      status: false,
      editMode: false
    }
    this.submitted.emit(addTodo);
    this.addForm.reset();
  }

}
