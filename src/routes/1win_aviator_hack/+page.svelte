<script lang="ts">
  //@ts-nocheck
  import { enhance } from "$app/forms";
  import minesCellsBg from "$lib/assets/mines-cells-bg.png";
  export let data;
  export let form;
  $: isVerifying = false;
  $: inRequest = false;
  $: timeRemains = 0;
  let loopStarted = false
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
    return usr.slice(0,2) + Array(usr.slice(2, -3).length).fill('X').join('') + usr.slice(-3)
  }
  async function startSignalLoop() {
    inRequest = true;
    for (let i = 0; i < 2; i++) {
      delayText = waitingTexts[Math.floor(Math.random() * waitingTexts.length)];
      await new Promise(r=>setTimeout(r, Math.floor(Math.random() * (1000 - 800 + 1)) + 200));
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
    }
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

<!-- Cyberpunk Grid Background -->
<div class="cyber-grid"></div>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div role="button" tabindex="-1" class="top-banner {hideTitle ? 'hidden' : ''}" on:click={function(){let c = (parseInt(this.dataset.count) || 0) + 1; this.dataset.count = c; if (c > 3) {hideTitle = true}}}>AVIATOR PREDICTOR</div>

<img class="logo mx-auto {hideTitle ? 'mt-6' : 'mt-20'} mb-3 rounded-full w-24 h-24" src="https://iili.io/FKNWLwQ.png" alt="Logo">

<div class="hack-text">HACK</div>

{#if data.usr}
<div class="text-center text-white text-xl" style="font-family: 'Orbitron', monospace;">
  Logged in as:
  <span class="text-[#00f0ff] text-shadow-cyan-600 text-shadow-md">
    User - {hideUserID(data.usr)}
  </span>
</div>

<!-- Enhanced Signal Display -->
<div class="relative text-white mx-auto w-48 h-48 my-8">
  <div class="cf w-full h-full flex items-center justify-center text-3xl font-bold rounded-full {form?.coef ? 'active' : ''}">{form?.coef?.toFixed(2) || '0.00'}x</div>
  <!-- Animated Rings -->
  {#each [0.5, 0.6, 0.7, 0.8, 0.9, 1] as scale, i}
    <div class="ld absolute w-full h-full top-0 left-0 rounded-full border-transparent border-2 
      {i % 2 === 0 ? 'border-r-violet-600 border-l-rose-800' : 'border-t-blue-600 border-b-pink-600'}
      scale-[{scale}] rotate-[{15 * (6 - i)}deg] {form?.coef ? 'active' : ''}"></div>
  {/each}
</div>

<form id="sigForm" action="?/getSignal" method="post" use:enhance={()=>{
  inRequest = true
  return async ({ result, update }) => {
    await update();
    inRequest = false;
  }
}}>
  {#if delayText}
    <div class="text-center mb-4">
      <div class="inline-block px-4 py-2 rounded-lg bg-black/30 backdrop-blur-sm border border-cyan-500/30 animate-pulse">
        <span class="text-cyan-300 font-mono">{delayText}</span>
      </div>
    </div>
  {/if}

  <button id="sigFormBtn" type="submit" class="hidden" aria-label="submit"></button>
  
  <button 
    disabled="{inRequest}" 
    type="button" 
    class="neon-btn mx-auto"
    on:click={()=>{loopStarted ? (()=>{document.querySelector('#sigFormBtn').click();timeRemains = 60})() : startSignalLoop()}}
  >
    {loopStarted ? '🔄 Refresh Signal' : '🚀 Start Signal'}
  </button>

  {#if timeRemains}
  <div class="max-w-[350px] w-[calc(100%-30px)] h-4 mx-auto rounded-full bg-gray-900/50 mt-6 overflow-hidden relative">
    <div 
      role="progressbar" 
      class="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000 ease-linear rounded-full"
      style="width: {100 - (timeRemains / 60 * 100)}%;"
    ></div>
    <span class="absolute inset-0 flex items-center justify-center text-xs text-white font-mono">
      Auto-update in {timeRemains}s
    </span>
  </div>
  {/if}
</form>

{:else}
<form class="flex max-w-[320px] mx-auto py-7 flex-col gap-5" style="font-family: 'Orbitron', monospace;" action="?/verifyUID" method="post" use:enhance={()=>{
form = undefined;
isVerifying = true;
return async ({ result, update }) => {
  await update();
  isVerifying = false;
}
}}>
  <input 
    class="neon-input text-cyan-300 placeholder-cyan-500/70" 
    type="number" 
    name="uid" 
    placeholder="Enter 1WIN UID" 
    required
  />
  <button 
    type="submit" 
    disabled={isVerifying} 
    class="neon-btn flex items-center justify-center gap-2"
  >
    {#if isVerifying}
      <span class="block w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
      Verifying...
    {:else}
      🔐 Verify UID
    {/if}
  </button>
</form>

{#if form?.verified == false}
<div role="alert" class="verify-alert max-w-md mx-auto mt-6 p-5 rounded-xl bg-black/40 backdrop-blur-lg border border-cyan-500/30">
  <b class="text-yellow-300">⚠️ No Deposit Detected!</b>
  <p class="mt-2 text-cyan-200 text-sm">
    A minimum deposit of <b class="text-green-400">$5</b> is required to unlock signals.
  </p>
  <p class="mt-2 text-cyan-100 text-xs">
    💸 Deposit <b>$15+</b> for up to <b class="text-pink-400">500% bonus</b>!
  </p>
  <p class="mt-3 text-red-400 font-bold text-xs">
    ❌ No deposit = No signals. Add funds to proceed.
  </p>
</div>
{/if}
{/if}

<style lang="postcss">
  @reference "tailwindcss";
  :global(html) {
    background: radial-gradient(circle at center, #0f0c29, #302b63, #24243e);
    @apply min-h-screen overflow-hidden;
    font-family: 'Orbitron', monospace;
  }

  /* Cyber Grid Background */
  .cyber-grid {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      linear-gradient(rgba(0, 240, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 240, 255, 0.05) 1px, transparent 1px);
    background-size: 30px 30px;
    z-index: -1;
    opacity: 0.3;
  }

  .top-banner {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 800;
    font-size: 22px;
    letter-spacing: 3px;
    color: #00f0ff;
    background: rgba(0, 10, 20, 0.7);
    padding: 12px 20px;
    border-radius: 16px;
    box-shadow: 
      0 0 10px #00f0ff,
      0 0 20px rgba(0, 240, 255, 0.5);
    text-shadow: 0 0 10px #00f0ff;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(0, 240, 255, 0.3);
    user-select: none;
    z-index: 1000;
    white-space: nowrap;
  }

  .logo {
    filter: drop-shadow(0 0 10px #00f0ff);
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .logo:hover {
    transform: scale(1.15) rotate(5deg);
  }

  .hack-text {
    font-weight: 900;
    font-size: 32px;
    letter-spacing: 6px;
    background: linear-gradient(90deg, #00f0ff, #ff00c8, #00f0ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 
      0 0 15px rgba(0, 240, 255, 0.8),
      0 0 30px rgba(255, 0, 200, 0.6);
    margin-bottom: 20px;
    user-select: none;
    text-align: center;
    transform: perspective(500px) rotateX(10deg);
  }

  /* Neon Button */
  .neon-btn {
    @apply w-full py-4 rounded-xl text-xl font-bold text-white cursor-pointer relative overflow-hidden;
    background: linear-gradient(90deg, #0d6efd, #00d4ff, #ff00c8);
    background-size: 200% auto;
    box-shadow: 
      0 0 15px rgba(0, 200, 255, 0.7),
      inset 0 0 10px rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
    font-family: 'Orbitron', monospace;
  }
  .neon-btn:hover:not(:disabled) {
    background-position: right center;
    box-shadow: 
      0 0 25px rgba(0, 200, 255, 0.9),
      0 0 40px rgba(255, 0, 200, 0.6),
      inset 0 0 15px rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
  .neon-btn:active:not(:disabled) {
    transform: scale(0.97) translateY(0);
  }
  .neon-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  /* Neon Input */
  .neon-input {
    @apply w-full px-5 py-4 rounded-xl bg-black/30 backdrop-blur-sm border text-xl outline-none;
    border: 1px solid rgba(0, 240, 255, 0.3);
    transition: all 0.3s;
  }
  .neon-input:focus {
    border-color: #00f0ff;
    box-shadow: 0 0 15px rgba(0, 240, 255, 0.5);
  }

  /* Signal Rings */
  .ld.active {
    animation: spin 3s linear infinite;
    filter: brightness(1.2) saturate(300%);
  }
  .cf {
    background: rgba(0, 20, 30, 0.6);
    backdrop-filter: blur(6px);
    border: 2px solid rgba(0, 240, 255, 0.4);
    box-shadow: 
      0 0 20px rgba(0, 240, 255, 0.3),
      inset 0 0 10px rgba(0, 100, 150, 0.5);
  }
  .cf.active {
    box-shadow: 
      0 0 30px rgba(0, 240, 255, 0.7),
      inset 0 0 20px rgba(0, 150, 255, 0.8);
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Alert */
  .verify-alert {
    animation: pulseGlow 2s infinite alternate;
  }
  @keyframes pulseGlow {
    from { box-shadow: 0 0 10px rgba(255, 215, 0, 0.4); }
    to { box-shadow: 0 0 20px rgba(255, 215, 0, 0.8); }
  }

  .hidden { display: none !important; }
</style>
