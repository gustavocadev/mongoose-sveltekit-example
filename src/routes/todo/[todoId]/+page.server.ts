import type { Load } from '@sveltejs/kit';
import { TodoModel } from '../../../models/Todo';
import { dbConnect, dbDisconnect } from '../../../utils/db';
export const load: Load = async ({ params }) => {
  const todoId = params.todoId;
  if (!todoId) {
    return {
      status: 404,
      error: new Error('Not found'),
    };
  }
  console.log('todoId: ', todoId);
  await dbConnect();
  let foundTodo = await TodoModel.findById(todoId).lean();
  await dbDisconnect();
  foundTodo = JSON.parse(JSON.stringify(foundTodo));
  return {
    todo: foundTodo,
  };
};
