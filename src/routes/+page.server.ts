import type { Actions, Load } from '@sveltejs/kit';
import { TodoModel } from '../models/Todo';
import { dbConnect, dbDisconnect } from '../utils/db';

export const load: Load = async () => {
  await dbConnect();
  let todos = await TodoModel.find().lean();
  await dbDisconnect();
  todos = JSON.parse(JSON.stringify(todos));
  todos = todos.reverse();
  return {
    todos,
  };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const todoName = formData.get('todoName');

    const newTodo = {
      title: todoName,
      isDone: false,
    };

    await dbConnect();
    await TodoModel.create(newTodo);
    await dbDisconnect();

    console.log('New todo added: ', newTodo);
    return {
      success: true,
    };
  },
};
