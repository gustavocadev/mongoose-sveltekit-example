import { models, Schema, model } from 'mongoose';
import type { TodoModelType } from 'src/types/types';

const TodoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      default: 'false',
    },
  },
  {
    timestamps: true,
  }
);

export const TodoModel =
  models.Todo ?? model<TodoModelType>('Todo', TodoSchema);
