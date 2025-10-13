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

  const waitingTexts = [
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
    if (usr.length <= 5) return usr;
    return usr.slice(0, 2) + 'X'.repeat(usr.length - 5) + usr.slice(-3);
  }

  async function startSignalLoop() {
    inRequest = true;
    // Simulate minimal initial delay (only for first load)
    for (let i = 0; i < 2; i++) {
      delayText = waitingTexts[Math.floor(Math.random() * waitingTexts.length)];
      await new Promise(r => setTimeout(r, 200 + Math.random() * 200));
    }
    inRequest = false;
    delayText = '';
    loopStarted = true;
    timeRemains = 60;

    const tick = () => {
      timeRemains--;
      if (timeRemains <= 0) {
        document.querySelector('#sigFormBtn')?.click();
        timeRemains = 60;
      }
    };

    tick(); // Immediate first tick
    timer = setInterval(tick, 1000);
  }

  function refreshSignal() {
    // Instant submission — no artificial delay
    document.querySelector('#sigFormBtn')?.click();
    timeRemains = 60;
  }
</script>

<svelte:head>
  <title>1Win Aviator Predictor</title>
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
    const count = (parseInt(this.dataset.count) || 0) + 1;
    this.dataset.count = count;
    if (count > 3) hideTitle = true;
  }}
>
  AVIATOR PREDICTOR
</div>

<img
  class="logo mx-auto {hideTitle ? 'mt-6' : 'mt-20'} mb-3 rounded-full w-24 h-24"
  src="https://iili.io/FKNWLwQ.png"
  alt="Aviator Predictor Logo"
/>

<div class="hack-text">PREDICTOR</div>

{#if data?.usr}
  <div class="text-center text-white text-base opacity-80" style="font-family: 'Orbitron', monospace;">
    Logged in as:
    <span class="text-cyan-300">
      User - {hideUserID(data.usr)}
    </span>
  </div>

  <!-- Signal Display: Enlarged, clean, centered -->
  <div class="relative text-white mx-auto w-60 h-60 my-6">
    <div class="cf w-full h-full flex items-center justify-center text-4xl font-bold rounded-full {form?.coef ? 'active' : ''}">
      {form?.coef?.toFixed(2) || '0.00'}<span class="text-xl">x</span>
    </div>

    <!-- Animated rings: scaled to fill 240px container -->
    {#each [0.5, 0.6, 0.7, 0.8, 0.9, 1.0] as scale, i}
      <div
        class="ld absolute w-full h-full top-0 left-0 rounded-full border-transparent border-2 {form?.coef ? 'active' : ''}"
        class:border-r-violet-600={i === 0}
        class:border-l-rose-800={i === 0}
        class:border-t-blue-600={i === 1}
        class:border-b-pink-600={i === 1}
        class:border-r-teal-600={i === 2}
        class:border-l-yellow-600={i === 2}
        class:border-t-fuchsia-600={i === 3}
        class:border-b-indigo-600={i === 3}
        class:border-r-red-400={i === 4}
        class:border-l-lime-400={i === 4}
        class:border-t-cyan-400={i === 5}
        class:border-b-amber-400={i === 5}
        style="transform: scale({scale}) rotate({15 * (6 - i)}deg);"
      ></div>
    {/each}
  </div>

  <form
    id="sigForm"
    action="?/getSignal"
    method="post"
    use:enhance={() => {
      inRequest = true;
      return async ({ update }) => {
        await update();
        inRequest = false;
      };
    }}
  >
    {#if delayText}
      <div class="text-white text-center text-sm opacity-75 mb-2">{delayText}</div>
    {/if}

    <button id="sigFormBtn" type="submit" class="hidden" aria-label="Submit signal request"></button>

    <button
      type="button"
      disabled={inRequest}
      class="block w-[360px] mx-auto py-4 my-4 rounded-xl text-xl text-white font-bold cursor-pointer hover:saturate-150 active:scale-95 transition duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-40 shadow-md"
      style="background: linear-gradient(93.73deg, #108de7, #0855c4); font-family: 'Orbitron', monospace;"
      on:click={() => (loopStarted ? refreshSignal() : startSignalLoop())}
    >
      {loopStarted ? 'Refresh Signal' : 'Start Signal'}
    </button>

    {#if timeRemains > 0}
      <div class="max-w-[360px] w-[calc(100%-30px)] h-4 mx-auto rounded-full bg-cyan-900/40 relative overflow-hidden">
        <div
          role="progressbar"
          aria-valuenow={timeRemains}
          aria-valuemin="0"
          aria-valuemax="60"
          class="h-full bg-cyan-500 absolute top-0 right-0 origin-right transition-transform duration-1000 ease-linear"
          style="transform: scaleX({timeRemains / 60});"
        ></div>
        <span class="absolute inset-0 flex items-center justify-center text-white text-xs font-mono">
          Auto-update in {timeRemains}s
        </span>
      </div>
    {/if}
  </form>

{:else}
  <form
    class="flex max-w-[280px] mx-auto py-6 flex-col gap-4"
    style="font-family: 'Orbitron', monospace;"
    action="?/verifyUID"
    method="post"
    use:enhance={() => {
      form = undefined;
      isVerifying = true;
      return async ({ update }) => {
        await update();
        isVerifying = false;
      };
    }}
  >
    <input
      class="text-cyan-300 bg-cyan-900/30 hover:bg-cyan-900/50 focus:bg-cyan-900/60 outline-2 outline-transparent focus:outline-cyan-400 outline-offset-2 text-base border border-cyan-600 px-4 py-2.5 rounded-lg transition duration-200"
      type="number"
      name="uid"
      placeholder="Enter 1WIN UID"
      required
    />
    <button
      type="submit"
      disabled={isVerifying}
      class="text-white bg-cyan-600 hover:bg-cyan-500 text-base font-bold py-2.5 rounded-lg outline-2 outline-transparent outline-offset-2 active:scale-95 focus:outline-cyan-400 disabled:opacity-40 transition duration-200"
    >
      {#if isVerifying}
        <span class="inline-block w-5 h-5 border-2 border-r-transparent border-white rounded-full animate-spin"></span>
      {:else}
        Verify
      {/if}
    </button>
  </form>

  {#if form?.verified === false}
    <div
      role="alert"
      class="bg-cyan-900/50 border border-cyan-700 text-cyan-200 my-5 p-4 rounded-lg max-w-md w-[calc(100%-40px)] mx-auto text-sm"
      style="font-family: 'Orbitron', monospace;"
    >
      <b>⚠️ No Deposit Found</b><br>
      A minimum deposit of <b>$5</b> is required to access signals.<br>
      💸 Deposit <b>$15+</b> for up to <b>500% bonus</b>!<br>
      <b>No deposit = no signals.</b>
    </div>
  {/if}
{/if}

<style lang="postcss">
  @reference "tailwindcss";
  :global(html) {
    background: radial-gradient(circle at center, #121212 0%, #0a0a0a 100%);
    @apply min-h-screen;
  }

  .top-banner {
    position: fixed;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Orbitron', monospace;
    font-weight: 800;
    font-size: 18px;
    letter-spacing: 1.5px;
    color: #00e0ff;
    background: rgba(0, 20, 30, 0.7);
    padding: 8px 12px;
    border-radius: 10px;
    box-shadow: 0 0 6px rgba(0, 224, 255, 0.5);
    text-shadow: 0 0 4px rgba(0, 200, 255, 0.6);
    user-select: none;
    z-index: 1000;
    white-space: nowrap;
    backdrop-filter: blur(4px);
  }

  .logo {
    filter: drop-shadow(0 0 8px rgba(0, 200, 255, 0.4));
    transition: transform 0.25s ease;
  }
  .logo:hover {
    transform: scale(1.08);
  }

  .hack-text {
    font-family: 'Orbitron', monospace;
    font-weight: 800;
    font-size: 24px;
    letter-spacing: 3px;
    color: #e0f7ff;
    text-align: center;
    margin-bottom: 12px;
    text-shadow: none; /* Removed all glow */
  }

  .cf {
    font-family: 'Orbitron', monospace;
    color: white; /* Pure white, no shadow */
    text-shadow: none;
  }

  .ld.active {
    animation: spin 2.2s linear infinite;
    filter: saturate(400%) contrast(120%);
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>
