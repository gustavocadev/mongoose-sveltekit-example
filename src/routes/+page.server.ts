import { goto } from '$app/navigation';
import type { Actions, Load } from '@sveltejs/kit';
import { TodoModel } from '../models/Todo';
import { dbConnect, dbDisconnect } from '../utils/db';
import { redirect } from '@sveltejs/kit';

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
  create: async ({ request }) => {
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
  update: async ({ request }) => {
    const formData = await request.formData();
    const todoId = formData.get('todoId');
    const todoName = formData.get('todoName');
    await dbConnect();
    await TodoModel.findByIdAndUpdate(todoId, {
      title: todoName,
    }).lean();
    await dbDisconnect();

    console.log('Todo updated: ', todoId);

    return {
      success: true,
    };
  },

  delete: async ({ request }) => {
    const formData = await request.formData();
    const todoId = formData.get('todoId');
    await dbConnect();
    await TodoModel.findByIdAndDelete(todoId);
    await dbDisconnect();

    console.log('Todo deleted: ', todoId);
    return {
      success: true,
    };
  },
};
