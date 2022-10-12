<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import type { TodoModelType } from '../../../types/types';
  type Data = {
    todo: TodoModelType;
  };
  export let data: Data;

  let isLoading = false;

  const { todo } = data;
</script>

<form
  action="/?/update"
  method="POST"
  use:enhance={() => {
    isLoading = !isLoading;
    return async ({ result }) => {
      goto(`/`);
      // after form submission to server
      if (result.type === 'invalid') {
        goto(`/todo/${todo._id}`);
      }
    };
  }}
  class="flex flex-col gap-2 "
>
  <label for="">Update your Todo</label>
  <input
    type="text"
    name="todoName"
    class="border p-2 rounded"
    value={todo.title}
  />
  <input type="hidden" name="todoId" value={todo._id} />
  <button
    type="submit"
    class="bg-green-300 hover:bg-green-400 rounded py-2 flex items-center justify-center "
    disabled={isLoading}
  >
    {#if isLoading}
      <div
        class="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-gray-700 rounded-full disabled:opacity-50"
        role="status"
        aria-label="loading"
      >
        <span class="sr-only">Loading...</span>
      </div>
    {:else}
      Update
    {/if}
  </button>
</form>
