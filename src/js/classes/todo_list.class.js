export class TodoList {
	constructor() {
		this.todos = [];
	}
	
	nuevoTodo(task) {
		this.todos.push(task);
	}

	eliminarTodo(id) {
		id /= 1;
		this.todos = this.todos.filter(todo => todo.id != id);
	}

	marcarCompletado(id) {
		id /= 1;
		for(const todo of this.todos) {
			if(todo.id === id) {
				todo.completado = !todo.completado;
				break;
			}
		}
	}

	eliminarCompletados() {
		this.todos = this.todos.filter(todo => !todo.completado);
	}
}