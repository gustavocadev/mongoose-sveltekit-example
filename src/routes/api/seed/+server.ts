import { json } from '@sveltejs/kit';
import { TodoModel } from '../../../lib/models/Todo';

const todos = [
  {
    title: 'Watch Attack on titan',
    isDone: false,
  },
  {
    title: 'Watch Haikyuu',
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
  await TodoModel.deleteMany();
  await TodoModel.insertMany(todos);

  return json({
    message: 'seeded',
  });
};
