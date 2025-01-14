import {Todo} from './index';

export class TodoList {
	constructor() {
		this.cargarLocalStorage();
	}
	
	nuevoTodo(task) {
		this.todos.push(task);
		this.guardarLocalStorage();
	}

	eliminarTodo(id) {
		id /= 1;
		this.todos = this.todos.filter(todo => todo.id != id);
		this.guardarLocalStorage();
	}

	marcarCompletado(id) {
		id /= 1;
		for(const todo of this.todos) {
			if(todo.id === id) {
				todo.completado = !todo.completado;
				this.guardarLocalStorage();
				break;
			}
		}
	}

	eliminarCompletados() {
		this.todos = this.todos.filter(todo => !todo.completado);
		this.guardarLocalStorage();
	}

	guardarLocalStorage() {
		localStorage.setItem('todo', JSON.stringify(this.todos));
	}

	cargarLocalStorage() {
		this.todos = (localStorage.getItem('todo'))
			? JSON.parse(localStorage.getItem('todo'))
			: [];

		this.todos = this.todos.map(Todo.fromJson);
	}
}