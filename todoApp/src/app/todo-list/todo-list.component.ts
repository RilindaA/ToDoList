import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit{
  @Input() todos = [];
  newtodo: string;
  newDate: Date;
  newstatus: boolean;
  showComplete: boolean = false;
  dateFilter:Date;
  editMode: boolean
  todolistFG = new FormGroup({
    text: new FormControl(''),
    date: new FormControl(),
    status: new FormControl(false)
  });

  ngOnInit(): void{
    this.todolistFG.valueChanges.subscribe(val => {
      this.newtodo = val.text;
      this.newDate = val.date;
      this.newstatus = val.status;
    });
  }
 
  edit(todo){
    this.todos.forEach(el => {
      if(el.text === todo.text){
        this.todolistFG.get('text').setValue(todo.text);
        this.todolistFG.get('date').setValue(moment(todo.date).format('YYYY-MM-DD'));
        this.todolistFG.get('status').setValue(todo.status);
        el.editMode = true;
      }
    });
  }
  save(todo){
    this.todos.forEach(el => {
      if(el.text === todo.text){
        el.text = this.newtodo;
        el.status = this.newstatus;
        el.date = this.newDate;
      }
    });
    localStorage.setItem('todo', JSON.stringify(this.todos));
    todo.editMode = false;
  }
  cancelEdit(todo){
    todo.editMode = false;
  }
  deleteTodo(todo){
    this.todos.forEach(el => {
      if(el.text === todo.text){
        this.todos.splice(todo,1);
      }
    });
  }
  filterByDate(){
    let filtered = this.todos.filter(el => { return moment(el.date).format('YYYY-MM-DD') === moment(this.dateFilter).format('YYYY-MM-DD')});
    this.todos = filtered;
  }
  filterByStatus(){
    this.todos.forEach(el => {
      if(el.status === true){
        this.todos = this.todos.filter(el => { return el.status === true});
      }
    });
  }
  onDateChange(e){
    this.dateFilter = e;
  }
}
