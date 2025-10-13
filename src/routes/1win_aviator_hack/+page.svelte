<script lang="ts">
  //@ts-nocheck
  import { enhance } from "$app/forms";
  import minesCellsBg from "$lib/assets/mines-cells-bg.png";
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
  class="logo mx-auto {hideTitle ? 'mt-6' : 'mt-20'} mb-3 rounded-full w-24 h-24"
  src="https://iili.io/FKNWLwQ.png"
  alt="Logo"
/>

<div class="hack-text">HACK</div>

{#if data.usr}
  <div class="text-center text-white text-xl" style="font-family: 'Orbitron', monospace;">
    Logged in as:
    <span class="text-[#00f0ff] text-shadow-cyan-600 text-shadow-md">
      User - {hideUserID(data.usr)}
    </span>
  </div>

  <!-- ENHANCED SIGNAL DISPLAY -->
  <div class="relative text-white mx-auto w-48 h-48 my-8">
    <div class="cf w-full h-full flex items-center justify-center text-5xl md:text-6xl font-black rounded-full {form?.coef ? 'active' : ''}">
      {form?.coef?.toFixed(2) || '0.00'}<span class="text-xl">x</span>
    </div>
    <!-- Animated rings -->
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
    <div class="text-white text-center min-h-[28px]">{delayText}</div>
    <button id="sigFormBtn" type="submit" class="hidden" aria-label="submit"></button>
    <button
      disabled={inRequest}
      type="button"
      class="block w-[350px] mx-auto py-3 my-5 rounded-xl text-2xl text-white font-bold cursor-pointer hover:saturate-150 active:scale-75 transition duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-30 shadow hover:shadow-cyan-400 scale-90"
      style="background: linear-gradient(93.73deg,#108de7,#0855c4);font-family: 'Orbitron', monospace;"
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
      <div class="max-w-[350px] w-[calc(100%-30px)] h-5 mx-auto rounded-2xl bg-cyan-950 relative overflow-hidden">
        <div
          role="progressbar"
          class="h-full bg-cyan-700 transition ease-out duration-300"
          style="width: {100 - timeRemains / 60 * 100}%;"
        ></div>
        <span class="absolute w-full h-full flex items-center justify-center text-white top-0 left-0 text-xs">
          Auto Updating in {timeRemains}s
        </span>
      </div>
    {/if}
  </form>

{:else}
  <form
    class="flex max-w-[300px] mx-auto py-7 flex-col gap-5"
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
      class="text-cyan-400 bg-cyan-950/50 hover:bg-cyan-950 focus:bg-cyan-950 outline-2 outline-transparent focus:outline-cyan-400 outline-offset-2 text-xl border border-cyan-600 px-3 py-2 rounded-xl transition duration-300 ease-in-out"
      type="number"
      name="uid"
      placeholder="Enter 1WIN UID"
      required
    />
    <button
      type="submit"
      disabled={isVerifying}
      class="text-white bg-cyan-600 shadow shadow-transparent hover:bg-cyan-400 hover:shadow-cyan-700 text-xl font-bold px-3 py-1 rounded-xl outline-2 outline-transparent outline-offset-2 active:scale-75 focus:outline-cyan-400 disabled:opacity-30 transition ease-in-out duration-300"
    >
      {#if isVerifying}
        <span class="block w-[25px] h-[25px] my-0.5 text-transparent mx-auto rounded-full border-2 border-transparent border-b-white animate-spin">O</span>
      {:else}
        Verify
      {/if}
    </button>
  </form>

  {#if form?.verified == false}
    <div
      role="alert"
      class="verify-alert bg-cyan-800 text-lg text-cyan-300 my-5 p-5 rounded-lg outline-2 outline-cyan-600 outline-offset-3 max-w-4xl w-[calc(100%-40px)] mx-auto"
      style="font-family: 'Orbitron', monospace;"
    >
      <b>⚠️ Attention Needed: No Deposit Found!</b>
      <br />
      It looks like your 1win account doesn’t have any funds yet.
      To unlock signal access, a minimum deposit of <b>$5</b> is required.
      <br />
      🚫 <b>Signals remain inaccessible until a deposit is made.</b>
      💸 <b>Deposit $15 or more</b> and receive up to <b>500% bonus</b> on your main account!
      <br />
      👉 <b>No deposit means no signals.</b>
      <br />
      <b>Add funds now and start winning!</b>
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
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Orbitron', monospace;
    font-weight: 900;
    font-size: 24px;
    letter-spacing: 3px;
    background: linear-gradient(90deg, #00f0ff, #a020f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow:
      0 0 10px rgba(0, 240, 255, 0.7),
      0 0 20px rgba(160, 32, 240, 0.5);
    padding: 12px 20px;
    border-radius: 16px;
    box-shadow:
      0 0 15px rgba(0, 240, 255, 0.6),
      0 0 30px rgba(160, 32, 240, 0.4);
    user-select: none;
    z-index: 1000;
    white-space: nowrap;
    animation: pulseGlow 2s infinite alternate;
  }

  @keyframes pulseGlow {
    from {
      text-shadow:
        0 0 10px rgba(0, 240, 255, 0.7),
        0 0 20px rgba(160, 32, 240, 0.5);
    }
    to {
      text-shadow:
        0 0 15px rgba(0, 240, 255, 1),
        0 0 30px rgba(160, 32, 240, 0.8);
    }
  }

  .logo {
    filter: drop-shadow(0px 0px 5px theme(--color-cyan-600));
    transition: transform 0.3s;
  }
  .logo:hover {
    transform: scale(1.1);
  }

  .hack-text {
    font-family: 'Orbitron', monospace;
    font-weight: 800;
    font-size: 22px;
    letter-spacing: 4px;
    background: linear-gradient(90deg, #00f0ff, #0088ff, #00f0ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 20px #00f0ff, 0 0 40px #0088ff;
    margin-bottom: 10px;
    user-select: none;
    text-align: center;
  }

  .cf {
    font-family: 'Orbitron', monospace;
    text-shadow:
      0 0 10px #00f0ff,
      0 0 20px #00aaff,
      0 0 30px #0088ff;
    transition: transform 0.2s;
  }
  .cf:hover {
    transform: scale(1.05);
  }

  .ld.active {
    animation: spin 2s linear infinite;
    filter: contrast(150%) saturate(500%);
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .verify-alert {
    animation: getAttention 3s ease-out forwards;
  }

  @keyframes getAttention {
    from { box-shadow: 0 0 30px 20px theme(--color-cyan-600); }
    to { box-shadow: 0 0 0 0 theme(--color-cyan-600); }
  }
</style>
