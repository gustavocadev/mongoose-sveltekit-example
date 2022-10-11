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

<main class="px-[20px] sm:px-[100px] xl:px-[400px] my-4">
  <h2 class="text-center text-4xl font-bold">My Todos</h2>
  <form
    method="POST"
    class="flex gap-2 flex-col"
    use:enhance={({ form, data }) => {
      // Before form submission to server
      // Optimistic UI
      const todoName = String(data.get('todoName'));
      todos = [{ title: todoName, _id: nanoid(), isDone: false }, ...todos];
      form.reset();
      console.log('2.All todos with the new todo', todos);
      return async ({ update, result }) => {
        // After form submission to server
        const currentTodos = await getCurrentTodos();

        // change todos to currentTodos from server
        todos = currentTodos;
        console.log('1.update todos with the right id from mongodb', todos);

        await update();
      };
    }}
  >
    <label for="">Todo</label>
    autofocus
    <!-- svelte-ignore a11y-autofocus -->
    <input
      type="text"
      name="todoName"
      class="border rounded p-2 w-full"
      autofocus
    />
    <button
      type="submit"
      class="bg-purple-500 rounded w-full py-2 px-4 hover:bg-purple-600 text-xl font-semibold"
    >
      >Add</button
    >
  </form>
  <ul class="text-xl px-4 mt-4 flex flex-col gap-4">
    {#each todos as todo, idx}
      <li class="p-4 bg-purple-100 rounded flex justify-between items-center">
        <p>{idx + 1}. {todo.title}</p>
        <button
          class="px-4 py-2 rounded bg-red-300 hover:bg-red-400"
          on:click={() => handleDeleteTodo(todo._id)}
        >
          >Delete</button
        >
      </li>
    {/each}
  </ul>
</main>
