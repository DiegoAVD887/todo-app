import {Todo, TodoList} from './classes';
import {todoList} from '../index.js';

// Referencias en el HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput    = document.querySelector('.new-todo');

export const crearTodoHtml = (todo) => {
	const htmlTodo = `
	<li class="" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox">
			<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="${todo.tarea}">
	</li>`;

	const div = document.createElement('div');
	div.innerHTML = htmlTodo;

	divTodoList.append(div.firstElementChild);
	return(div.firstElementChild);
}

// Eventos
txtInput.addEventListener('keyup', (event) => {
	if( (event.key === 'Enter' || event.keyCode === 13) && !(txtInput.value.trim() === '') ) {
		const newTask = new Todo(txtInput.value);
		txtInput.value = '';
		todoList.nuevoTodo(newTask);
		crearTodoHtml(newTask);
	}
});

divTodoList.addEventListener('click', (event) => {
	const nombreElemento = event.target.localName;
	const todoElement    = event.target.parentElement.parentElement;
	const todoId         = todoElement.getAttribute('data-id');

	if(nombreElemento.includes('input')) {
		todoList.marcarCompletado(todoId);
		todoElement.classList.toggle('completed');
	}
})