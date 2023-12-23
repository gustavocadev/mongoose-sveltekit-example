<script lang="ts">
  import type { TodoModelType } from 'src/types/types';
  import { nanoid } from 'nanoid';
  import { enhance } from '$app/forms';
  import { getCurrentTodos } from '../helpers/getCurrentTodos';
  import { deleteTodoIn_DB_byId } from '../helpers/deleteTodo';

  type Data = {
    todos: TodoModelType[];
  };

  export let data: Data;
  let { todos } = data;

  let isLoading = false;

  // console.log('1.todos in the first render', todos);
  const handleDeleteTodo = async (id: string) => {
    // let's do optimistic UI
    const updatedTodos = todos.filter((todo) => todo._id !== id);
    todos = updatedTodos;

    // let's do a request to the server
    const ok = await deleteTodoIn_DB_byId(id);

    // if the request failed, we need to revert the UI
    if (!ok) {
      const currentTodos = await getCurrentTodos();
      todos = currentTodos;
    }
  };
</script>

<svelte:head>
  <title>Todo App 📝</title>
</svelte:head>

<h2 class="text-center text-4xl font-bold">My Todos</h2>
<form
  method="POST"
  class="flex gap-2 flex-col"
  action="?/create"
  use:enhance={({ form, data }) => {
    // Before form submission to server
    // Optimistic UI
    const todoName = String(data.get('todoName'));
    todos = [{ title: todoName, _id: nanoid(), isDone: false }, ...todos];
    form.reset();
    console.log('2.All todos with the new todo', todos);
    isLoading = true;
    return async ({ update, result }) => {
      // After form submission to server
      const currentTodos = await getCurrentTodos();

      // change todos to currentTodos from server
      todos = currentTodos;
      console.log('1.update todos with the right id from mongodb', todos);
      isLoading = false;
      await update();
    };
  }}
>
  <label for="todo">Todo</label>
  <!-- svelte-ignore a11y-autofocus -->
  <input
    type="text"
    name="todoName"
    class="border rounded p-2 w-full"
    autofocus
    id="todo"
  />
  <button
    type="submit"
    class="bg-purple-500 rounded w-full py-2 px-4 hover:bg-purple-600 text-xl font-semibold"
    disabled={isLoading}
  >
    >Add</button
  >
</form>
<ul class="text-xl px-4 mt-4 flex flex-col gap-4">
  {#each todos as todo, idx}
    <li class="p-4 bg-purple-100 rounded flex justify-between items-center">
      <p>{idx + 1}. {todo.title}</p>
      <section class="flex gap-2">
        <form
          action="?/delete"
          method="POST"
          use:enhance={({ data }) => {
            // Before form submission to server
            // Optimistic UI
            isLoading = true;
            const updatedTodos = todos.filter(
              (todo) => todo._id !== String(data.get('todoId'))
            );
            todos = updatedTodos;
            return async ({ result }) => {
              if (result.type === 'error') {
                // if the request failed, we need to revert the UI
                const currentTodos = await getCurrentTodos();
                todos = currentTodos;
              }
              isLoading = false;
            };
          }}
        >
          <button
            class="px-4 py-2 rounded bg-red-300 hover:bg-red-400"
            disabled={isLoading}
          >
            >Delete</button
          >
          <input type="hidden" name="todoId" value={todo._id} />
        </form>
        <a
          href={`/todo/${todo._id}`}
          class="px-4 py-2 rounded bg-yellow-200 hover:bg-yellow-300"
        >
          >Edit</a
        >
      </section>
    </li>
  {/each}
</ul>
