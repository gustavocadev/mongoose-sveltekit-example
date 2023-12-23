import type { Load } from '@sveltejs/kit';
import { TodoModel } from '../../../models/Todo';

export const load: Load = async ({ params }) => {
  const todoId = params.todoId;
  if (!todoId) {
    return {
      status: 404,
      error: new Error('Not found'),
    };
  }
  console.log('todoId: ', todoId);

  let foundTodo = await TodoModel.findById(todoId).lean();

  foundTodo = JSON.parse(JSON.stringify(foundTodo));

  return {
    todo: foundTodo,
  };
};
