import type { Actions, Load } from '@sveltejs/kit';
import { TodoModel } from '../models/Todo';
import { redirect } from '@sveltejs/kit';

export const load: Load = async () => {
  let todos = await TodoModel.find().lean();

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

    await TodoModel.create(newTodo);

    console.log('New todo added: ', newTodo);
    return {
      success: true,
    };
  },
  update: async ({ request }) => {
    const formData = await request.formData();
    const todoId = formData.get('todoId');
    const todoName = formData.get('todoName');

    await TodoModel.findByIdAndUpdate(todoId, {
      title: todoName,
    }).lean();

    console.log('Todo updated: ', todoId);
    return redirect(303, '/');
  },

  delete: async ({ request }) => {
    const formData = await request.formData();
    const todoId = formData.get('todoId');

    await TodoModel.findByIdAndDelete(todoId);

    console.log('Todo deleted: ', todoId);
    return {
      success: true,
    };
  },
};
