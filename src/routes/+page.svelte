<script lang="ts">
  import { nanoid } from 'nanoid';
  import { enhance } from '$app/forms';
  import type { PageServerData } from './$types';

  export let data: PageServerData;
  $: ({ todos } = data);
  $: console.log(todos);
  let isLoading = false;
</script>

<svelte:head>
  <title>Todo App 📝</title>
</svelte:head>

<h2 class="text-center text-4xl font-bold">My Todos</h2>
<form
  method="POST"
  class="flex gap-2 flex-col"
  action="?/create"
  use:enhance={({ formElement, formData }) => {
    isLoading = true;
    // Before form submission to server
    // Optimistic UI
    const todoName = String(formData.get('todoName'));
    todos = [{ title: todoName, _id: nanoid(), isDone: false }, ...todos];
    formElement.reset();

    console.log('2.All todos with the new todo', todos);
    return async ({ update, result }) => {
      isLoading = false;
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
        <form action="?/delete" method="POST" use:enhance>
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
