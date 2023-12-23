<script lang="ts">
  import { applyAction, enhance } from '$app/forms';
  import type { PageServerData } from './$types';

  export let data: PageServerData;

  let isLoading = false;

  $: ({ todo } = data);
</script>

<form
  action="/?/update"
  method="POST"
  use:enhance={() => {
    isLoading = true;
    return async ({ result }) => {
      // after form submission to server
      if (result.type === 'error') {
        isLoading = false;
        return;
      }

      await applyAction(result);
    };
  }}
  class="flex flex-col gap-2"
>
  <label for="">Update your Todo</label>
  <input
    type="text"
    name="todoName"
    class="border p-2 rounded"
    value={todo?.title}
  />
  <input type="hidden" name="todoId" value={todo?._id} />
  <button
    type="submit"
    class="bg-green-300 hover:bg-green-400 rounded py-2 flex items-center justify-center"
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
