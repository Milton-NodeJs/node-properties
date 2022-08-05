import { TodoInput, TodoModel } from "../_schemas/Todo";
class TodoService {
    async createTodo(input: TodoInput) {
        return TodoModel.create(input);
    }

    async findTodos() {
        // Pagination login
        const founds = await TodoModel.find().lean();
        return founds;
    }

    async findSingleTodo(input: TodoInput) {
        return TodoModel.findOne(input).lean();
    }
}

export default TodoService;