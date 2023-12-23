import { error, type Load } from '@sveltejs/kit';
import { TodoModel } from '../../../lib/models/Todo';

export const load: Load = async ({ params }) => {
  const todoId = params.todoId;

  if (!todoId) {
    return {
      status: 404,
      error: new Error('Not found'),
    };
  }
  console.log('todoId: ', todoId);

  const todo = await TodoModel.findById(todoId).lean();

  if (!todo) {
    throw error(404, 'Not found');
  }

  return {
    todo: {
      ...todo,
      _id: todo._id.toString(),
    },
  };
};
