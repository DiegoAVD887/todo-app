import {Todo, TodoList} from './classes';
import {todoList} from '../index';

// Referencias en el HTML
const divTodoList       = document.querySelector('.todo-list')
	, txtInput          = document.querySelector('.new-todo')
	, todoCount         = document.querySelector('.todo-count')
	, borrarCompletados = document.querySelector('.clear-completed')
	, ulFilters         = document.querySelector('.filters')
	, anchorFiltros     = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
	const htmlTodo = `
	<li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
			<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
	</li>`;

	const div = document.createElement('div');
	div.innerHTML = htmlTodo;
	divTodoList.append(div.firstElementChild);

	actualizarListaPendientes();
	return(div.firstElementChild);
}

const actualizarListaPendientes = () => {
	const listaPendientes = todoList.todos.filter(todo => !todo.completado);
	todoCount.firstElementChild.innerText = listaPendientes.length;
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

	if(nombreElemento.includes('button')) {
		todoList.eliminarTodo(todoId);
		divTodoList.removeChild(todoElement);
	}
	
	actualizarListaPendientes();
});

borrarCompletados.addEventListener('click', () => {
	todoList.eliminarCompletados();
	for(let i = divTodoList.children.length - 1; i >= 0; i--) {
		const elemento = divTodoList.children[i];

		if(elemento.classList.contains('completed')) {
			divTodoList.removeChild(elemento);
		}
	}
});

ulFilters.addEventListener('click', (event) => {
	const filtro = event.target.text;
	if(!filtro) return;

	anchorFiltros.forEach(elem => elem.classList.remove('selected'));
	event.target.classList.add('selected');

	for(const elemento of divTodoList.children) {
		elemento.classList.remove('hidden');
		const completado = elemento.classList.contains('completed');

		switch(filtro) {
			case 'Pendientes':
				if(completado) {
					elemento.classList.add('hidden');
				}
				break;
			case 'Completados':
				if(!completado) {
					elemento.classList.add('hidden');
				}
				break;
			case 'Todos':
				break;
			default:
				break;
		}
	}
});