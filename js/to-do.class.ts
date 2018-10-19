import { ITodo } from './todo.interface';

export class Todo {
  private todos: ITodo[] = [
    { 'id': 0, 'label': 'Learn HTML5' },
    { 'id': 1, 'label': 'Learn CSS3 & Bootstrap' },
    { 'id': 2, 'label': 'Learn javascript Basic concepts' },
    { 'id': 3, 'label': 'Learn Javascript Advanced Concepts' }
  ];

  constructor() {

  }

  getTodos(): ITodo[] {
    return this.todos;
  }

  addTodo(todo: ITodo): boolean {
    if (todo.label === '') {
      alert('You must write something');
    } else if (/^[a-z\d\s]+$/i.test(todo.label)) {
      this.todos.push(todo);
      return true;
    } else {
      alert('You must write something valid!');
    }
    return false;
  }
}