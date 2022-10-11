import { json } from '@sveltejs/kit';
import { TodoModel } from '../../../models/Todo';
import { dbConnect, dbDisconnect } from '../../../utils/db';
import type { TodoModelType } from '../../../types/types';

export const GET = async () => {
  await dbConnect();
  let todos = (await TodoModel.find().lean()) as TodoModelType[];

  await dbDisconnect();

  todos = JSON.parse(JSON.stringify(todos));
  todos = todos.reverse();
  return json(todos);
};
