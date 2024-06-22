import './styles.css';

import {Todo, TodoList} from './js/classes';

const todoList = new TodoList();

const task = new Todo('Aprender JavaScript'); todoList.nuevoTodo(task);
const task2 = new Todo('Dominar el mundo'); todoList.nuevoTodo(task2);
console.log(todoList);