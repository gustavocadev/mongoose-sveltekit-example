import mongoose from 'mongoose';
import type { TodoModelType } from '../types/types';

const TodoSchema = new mongoose.Schema(
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
  mongoose.models.Todo ?? mongoose.model<TodoModelType>('Todo', TodoSchema);
