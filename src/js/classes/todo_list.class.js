export class TodoList {
	constructor() {
		this.todos = [];
	}
	
	nuevoTodo(task) {
		this.todos.push(task);
	}

	eliminarTodo(id) {

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
		
	}
}