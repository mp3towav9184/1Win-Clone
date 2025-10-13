<script lang="ts">
  //@ts-nocheck
  import { enhance } from "$app/forms";
  export let data;
  export let form;
  $: isVerifying = false;
  $: inRequest = false;
  $: timeRemains = 0;
  let loopStarted = false;
  let delayText = '';
  let timer = 0;
  let hideTitle = false;
  let waitingTexts = [
    "Checking connection...",
    "Fetching data...",
    "Processing request...",
    "Optimizing response...",
    "Finalizing...",
    "Establishing secure session...",
    "Compiling resources...",
    "Verifying user permissions...",
    "Assembling results...",
    "Resolving dependencies...",
    "Crunching numbers...",
    "Calibrating modules...",
    "Synchronizing data...",
    "Decrypting response...",
    "Cleaning up temp files...",
    "Reticulating splines...",
    "Preheating servers... 🔥",
    "Summoning data gnomes... 🧙‍♂️",
    "Stirring the digital soup...",
  ];

  function hideUserID(usr) {
    usr = String(usr);
    return usr.slice(0,2) + Array(usr.slice(2, -3).length).fill('X').join('') + usr.slice(-3);
  }

  async function startSignalLoop() {
    inRequest = true;
    for (let i = 0; i < 2; i++) {
      delayText = waitingTexts[Math.floor(Math.random() * waitingTexts.length)];
      await new Promise(r => setTimeout(r, Math.floor(Math.random() * (1000 - 800 + 1)) + 200));
    }
    inRequest = false;
    delayText = '';
    loopStarted = true;
    let fn = () => {
      timeRemains--;
      if (timeRemains <= 0) {
        document.querySelector('#sigFormBtn').click();
        timeRemains = 60;
      }
    };
    fn();
    timer = setInterval(fn, 1000);
  }
</script>

<svelte:head>
  <title>1Win Aviator Hack</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;900&display=swap');
  </style>
</svelte:head>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
  role="button"
  tabindex="-1"
  class="top-banner {hideTitle ? 'hidden' : ''}"
  on:click={() => {
    let c = (parseInt(this.dataset.count) || 0) + 1;
    this.dataset.count = c;
    if (c > 3) hideTitle = true;
  }}
>
  AVIATOR PREDICTOR
</div>

<img
  class="logo mx-auto {hideTitle ? 'mt-4' : 'mt-16'} mb-2 rounded-full w-20 h-20"
  src="https://iili.io/FKNWLwQ.png"
  alt="Logo"
/>

<div class="hack-text">HACK</div>

{#if data.usr}
  <div class="text-center text-white text-sm" style="font-family: 'Orbitron', monospace;">
    Logged in as:
    <span class="text-cyan-300">
      User - {hideUserID(data.usr)}
    </span>
  </div>

  <!-- CLEAN SIGNAL DISPLAY (NO GLOW, PERFECT SIZE) -->
  <div class="relative mx-auto w-40 h-40 my-6">
    <div class="cf w-full h-full flex items-center justify-center text-4xl font-bold text-white rounded-full {form?.coef ? 'active' : ''}">
      {form?.coef?.toFixed(2) || '0.00'}<span class="text-base">x</span>
    </div>
    <!-- Animated rings (keep "x" inside this area) -->
    <div class="ld absolute w-full h-full top-0 left-0 rounded-full border-transparent border-2 border-r-violet-600 border-l-rose-800 scale-[0.5] rotate-[90deg] {form?.coef ? 'active' : ''}"></div>
    <div class="ld absolute w-full h-full top-0 left-0 rounded-full border-transparent border-2 border-t-blue-600 border-b-pink-600 scale-[0.6] rotate-[75deg] {form?.coef ? 'active' : ''}"></div>
    <div class="ld absolute w-full h-full top-0 left-0 rounded-full border-transparent border-2 border-r-teal-600 border-l-yellow-600 scale-[0.7] rotate-[60deg] {form?.coef ? 'active' : ''}"></div>
    <div class="ld absolute w-full h-full top-0 left-0 rounded-full border-transparent border-2 border-t-fuchsia-600 border-b-indigo-600 scale-[0.8] rotate-[45deg] {form?.coef ? 'active' : ''}"></div>
    <div class="ld absolute w-full h-full top-0 left-0 rounded-full border-transparent border-2 border-r-red-400 border-l-lime-400 scale-[0.9] rotate-[30deg] {form?.coef ? 'active' : ''}"></div>
    <div class="ld absolute w-full h-full top-0 left-0 rounded-full border-transparent border-2 border-t-cyan-400 border-b-amber-400 rotate-[15deg] {form?.coef ? 'active' : ''}"></div>
  </div>

  <form
    id="sigForm"
    action="?/getSignal"
    method="post"
    use:enhance={() => {
      inRequest = true;
      return async ({ result, update }) => {
        await update();
        inRequest = false;
      };
    }}
  >
    <div class="text-white text-center text-xs min-h-[20px]">{delayText}</div>
    <button id="sigFormBtn" type="submit" class="hidden" aria-label="submit"></button>
    <button
      disabled={inRequest}
      type="button"
      class="block w-[280px] mx-auto py-2 my-4 rounded-lg text-base text-white font-bold cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 scale-95"
      style="background: linear-gradient(93.73deg,#108de7,#0855c4); font-family: 'Orbitron', monospace;"
      on:click={() => {
        if (loopStarted) {
          document.querySelector('#sigFormBtn').click();
          timeRemains = 60;
        } else {
          startSignalLoop();
        }
      }}
    >
      {loopStarted ? 'Refresh Signal' : 'Start Signal'}
    </button>

    {#if timeRemains}
      <div class="max-w-[280px] w-[calc(100%-30px)] h-2 mx-auto rounded-full bg-cyan-900/50 relative overflow-hidden">
        <div
          role="progressbar"
          class="h-full bg-cyan-500 transition-all duration-1000 ease-linear"
          style="width: {100 - timeRemains / 60 * 100}%;"
        ></div>
        <span class="absolute inset-0 flex items-center justify-center text-[10px] text-white pointer-events-none">
          Auto: {timeRemains}s
        </span>
      </div>
    {/if}
  </form>

{:else}
  <form
    class="flex max-w-[240px] mx-auto py-5 flex-col gap-3"
    style="font-family: 'Orbitron', monospace;"
    action="?/verifyUID"
    method="post"
    use:enhance={() => {
      form = undefined;
      isVerifying = true;
      return async ({ result, update }) => {
        await update();
        isVerifying = false;
      };
    }}
  >
    <input
      class="text-cyan-300 bg-cyan-900/40 text-sm border border-cyan-700 px-3 py-1.5 rounded-lg focus:outline-none focus:bg-cyan-900 focus:border-cyan-500"
      type="number"
      name="uid"
      placeholder="Enter 1WIN UID"
      required
    />
    <button
      type="submit"
      disabled={isVerifying}
      class="text-white bg-cyan-600 text-sm font-bold py-1.5 rounded-lg disabled:opacity-40"
    >
      {#if isVerifying}
        Verifying...
      {:else}
        Verify
      {/if}
    </button>
  </form>

  {#if form?.verified == false}
    <div
      role="alert"
      class="bg-cyan-900/60 text-cyan-200 my-4 p-3 rounded text-xs max-w-[280px] mx-auto"
      style="font-family: 'Orbitron', monospace;"
    >
      ⚠️ Deposit $5+ required for signal access. No deposit = no signals.
    </div>
  {/if}
{/if}

<style lang="postcss">
  @reference "tailwindcss";
  :global(html) {
    background: radial-gradient(circle at center, #1a1a1a 0%, #111 100%);
    @apply min-h-full;
  }

  .top-banner {
    position: fixed;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Orbitron', monospace;
    font-weight: 800;
    font-size: 18px;
    letter-spacing: 2px;
    color: #00e0ff;
    background: rgba(0, 0, 0, 0.5);
    padding: 6px 12px;
    border-radius: 10px;
    box-shadow: 0 0 6px rgba(0, 224, 255, 0.5);
    text-shadow: 0 0 6px rgba(0, 224, 255, 0.6);
    user-select: none;
    z-index: 1000;
    white-space: nowrap;
  }

  .logo {
    filter: drop-shadow(0 0 4px rgba(0, 200, 255, 0.4));
  }

  .hack-text {
    font-family: 'Orbitron', monospace;
    font-weight: 800;
    font-size: 18px;
    letter-spacing: 3px;
    color: #00d0ff;
    text-shadow: 0 0 6px rgba(0, 208, 255, 0.5);
    margin-bottom: 8px;
    text-align: center;
  }

  .cf {
    font-family: 'Orbitron', monospace;
    /* NO GLOW — clean white text */
    color: white;
  }

  .ld.active {
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>
