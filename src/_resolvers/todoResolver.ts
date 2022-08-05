import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { Todo, TodoInput } from '../_schemas/Todo';


import TodoService from '../_services/todo-service';
import { createWriteStream } from 'fs';



@Resolver((of) => Todo)
export class TodoResolver {
  constructor(private todoService: TodoService) {
    this.todoService = new TodoService();
  }
  private todos: Todo[] = []

  @Query((returns) => [Todo], { nullable: true })
  async getTodos(): Promise<Todo[]> {
    return await this.todoService.findTodos();
  }

  @Mutation((returns) => Todo)
  async addTodo(
    @Arg('todoInput') { title, description }: TodoInput
  ): Promise<Todo> {
    const todo = {
      // id: Math.random(), // not really unique
      title,
      description,
      status: false,
    };

    // await this.todos.push(todo)
    let todoSaved = await this.todoService.createTodo(todo);
    return todoSaved;
  }

}