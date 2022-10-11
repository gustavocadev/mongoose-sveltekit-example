import { json } from '@sveltejs/kit';
import { TodoModel } from '../../../models/Todo';
import { dbConnect, dbDisconnect } from '../../../utils/db';

const todos = [
  {
    title: 'Learn SvelteKit',
    isDone: false,
  },
  {
    title: 'Learn Svelte',
    isDone: false,
  },
  {
    title: 'Prepare a Milkshake',
    isDone: false,
  },
  {
    title: 'Cook a Pizza',
    isDone: false,
  },
];

// seed data
export const GET = async () => {
  await dbConnect();
  await TodoModel.deleteMany();
  await TodoModel.insertMany(todos);
  await dbDisconnect();
  return json({
    message: 'seeded',
  });
};
