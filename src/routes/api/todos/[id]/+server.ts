import { json, type RequestHandler } from '@sveltejs/kit';
import { TodoModel } from '../../../../models/Todo';
import { dbDisconnect, dbConnect } from '../../../../utils/db';

export const DELETE: RequestHandler = async ({ params }) => {
  const id = params.id;

  console.log('Deleting todo with id: ', id);
  await dbConnect();
  await TodoModel.deleteOne({ _id: id });
  await dbDisconnect();
  return json({
    success: true,
  });
};
