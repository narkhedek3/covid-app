import { Component, OnInit } from '@angular/core';

import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store';
import { ADD_TODO } from '../actions';
import { ITodo } from '../todo';

import { asyncData } from '../AsynchronousData';

@Component({
  selector: 'app-todo-overview',
  templateUrl: './todo-overview.component.html',
  styleUrls: ['./todo-overview.component.scss']
})
export class TodoOverviewComponent implements OnInit {

  @select() todos;
  @select() lastUpdate;
  data;

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.data = asyncData;
  }

  addTodo() {
    const todo: ITodo = {
      id: Math.random().toString(32).slice(2),
      description: 'new',
      isCompleted: false,
      priority: 'high'
    };
    this.ngRedux.dispatch({ type: ADD_TODO, todo });
    console.log(this.lastUpdate);
  }

}
