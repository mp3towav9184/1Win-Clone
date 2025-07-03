<script lang="ts">
  //@ts-nocheck
	import { enhance } from '$app/forms';
  export let data;
  $: readableBalance = data.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
</script>
<svelte:head>
  <title>1Win Clone</title>
</svelte:head>
<div class="px-3 py-3">
  <h1>1Win Clone</h1>
  <h3 class="text-slate-100 text-center text-2xl">-- Balance --</h3>
  <form class="flex relative my-3 max-w-96 w-full mx-auto text-slate-100 text-2xl" method="post" use:enhance>
    <input class="w-full bg-slate-800 rounded-md px-3 py-1 border border-cyan-600 shadow hover:bg-slate-700 hover:border-cyan-700 outline-2 outline-transparent outline-offset-2 focus:outline-cyan-700 transition ease-out duration-300" type="text" name="balance" bind:value="{readableBalance}">
    <button class="absolute top-0 right-0 h-full aspect-square rounded-r-md flex items-center justify-center bg-cyan-600 hover:bg-cyan-700 transition duration-300 ease-out" type="submit" aria-label="b">
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
        <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
      </svg>
    </button>
  </form>
  <div>
    <a data-sveltekit-reload class="game" href="/1win_mines">Mines Game</a>
    <a data-sveltekit-reload class="hack" href="/1win_mines_hack">Mines Hack</a>
    <a data-sveltekit-reload class="game !mt-10" href="/1win_aviator">Aviator Game</a>
    <a data-sveltekit-reload class="hack" href="/1win_aviator_hack">Aviator Hack</a>
    {#if data.role == 'super'}
    <a data-sveltekit-reload class="coa !mt-10" href="/co-admin-manager">Manage Co-Admins</a>
    {/if}
    <div class="mb-10"></div>
  </div>
</div>

<style lang="postcss">
  @reference "tailwindcss";
  :global(html) { @apply min-h-full bg-[#090f1e]; }
  h1 { @apply text-5xl text-center mt-3 mb-5 text-slate-50; }
  a { @apply block max-w-96 w-full mx-auto text-slate-100 font-bold text-center mt-5 py-2 px-2 text-3xl outline-none rounded-xl transition ease-out duration-300 shadow active:scale-75; }
  a.game { @apply bg-cyan-700 hover:bg-cyan-500 hover:shadow-cyan-400; }
  a.hack { @apply bg-amber-700 hover:bg-amber-600 hover:shadow-amber-500; }
  a.coa { @apply bg-emerald-600 hover:bg-emerald-500 hover:shadow-emerald-400; }
</style>