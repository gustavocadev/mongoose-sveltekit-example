import type { Handle } from '@sveltejs/kit';
import { dbConnect } from './lib/utils/db';

await dbConnect();

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);
  return response;
};
