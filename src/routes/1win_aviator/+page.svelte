<script lang="ts">
  //@ts-nocheck
  import headerTopLeft from "$lib/assets/header-top-left.png";
  import headerTopRight from "$lib/assets/header-top-right.png";
  import headerBottomLeft from "$lib/assets/header-bottom-left-aviator.png";
  import headerBottomRight from "$lib/assets/header-bottom-right.png";
  import fullscreenIcon from "$lib/assets/fullscreen.png";
  import xbl1 from "$lib/assets/xbl-1.png";
  import xbl2 from "$lib/assets/xbl-2.png";
  import xbl3 from "$lib/assets/xbl-3.png";
  import xbl4 from "$lib/assets/xbl-4.png";
  import initCanvas from "./main";
	import { onMount } from "svelte";
	import { invalidateAll } from "$app/navigation";
	import { genCoef } from "$main/src/lib/func";
  export let data;
  let balance = parseFloat(String(data.balance));
  $: readableBalance = balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  let crate = data.all_currencies[data.currency].crate;
  let min_bet = data.all_currencies[data.currency].aviator_min;
  let max_bet = data.all_currencies[data.currency].aviator_max;
  let default_bet = data.all_currencies[data.currency].aviator_default;
  let multiplys = data.all_currencies[data.currency].multiplys;
  let bets = [default_bet, default_bet];
  let activeBets = [false, false];
  let runningBets = [false, false];
  $: if (bets[0] > max_bet) { bets[0] = max_bet }
  $: if (bets[1] > max_bet) { bets[1] = max_bet }
  $: if (bets[0] < min_bet) { bets[0] = min_bet }
  $: if (bets[1] < min_bet) { bets[1] = min_bet }
  let gameStatus : 'idle' | 'playing' | 'ended' = 'idle';
  let gmCoef = 1;
  let totalPeople = 3;
  let totalPeopleWin = 0; // Doller
  let remainingPeople = 0;
  let dList = Array.from({length: 3}).map(_=>Math.floor(Math.random() * 70) + 1);
  $: betHistory = Array.from({length: totalPeople > 20 ? 20 : totalPeople}).map(_=>({player: 'd***' + parseInt(Math.random()*9), bet: parseFloat((Math.random() * (5000 - 80) + 80).toFixed(2)) , x: null, win: null, av: Math.floor(Math.random() * 70) + 1}));
  let lastBbtnclk = 0;
  let coefHistory = Array.from({length: 40}).map(_ => (Math.random() * (11 - 1) + 1).toFixed(2));
  let _winCoef = 1;
  let _winUSD = 1;
  let _winShow = false;
  function getColor(coef) {
    if (coef < 2) return '#34b4ff';
    if (coef < 10) return '#913ef8';
    return '#c017b4';
  }
  function getCoef() {
    if (activeBets[0] || activeBets[1]) {
      return data.aviator_coef;
    }
    return genCoef();
  }
  async function onGameStart() {
    gameStatus = 'idle';
    dList = Array.from({length: 3}).map(_=>Math.floor(Math.random() * 70) + 1);
    totalPeople = 3;
    totalPeopleWin = 0;
    runningBets = [false, false];
    let ispld = false;
    await new Promise(r => setTimeout(r, Math.floor(Math.random() * (1000 - 300 + 1)) + 300))
    while (window.currentCoef != window.targetCoef) {
      if (window.currentCoef == 1) {
        if (activeBets[0]) runningBets[0] = true;
        if (activeBets[1]) runningBets[1] = true;
        if (gameStatus != 'idle') gameStatus = "idle";
        totalPeople = totalPeople + Math.floor(Math.random() * (90 - 40 + 1)) + 40;
        remainingPeople = totalPeople;
      } else {
        if (!ispld) {playSound('start'); ispld = true};
        if (gameStatus != 'playing') gameStatus = "playing";
        let ri = Math.floor(Math.random() * betHistory.length);
        if (!betHistory[ri].x) {
          betHistory[ri].x = window.currentCoef.toFixed(2);
          betHistory[ri].win = betHistory[ri].bet * window.currentCoef;
          totalPeopleWin += betHistory[ri].win;
          remainingPeople--;
        }
        if (remainingPeople > 70) {
          let pn = Math.floor(Math.random() * 6);
          remainingPeople -= pn;
          totalPeopleWin += 125*pn;
        }
      }
      await new Promise(r => setTimeout(r, Math.floor(Math.random() * (1000 - 300 + 1)) + 300))
    }
  }
  function onGameEnd() {
    playSound('flew');
    gameStatus = 'ended';
    let ex = window.targetCoef;
    coefHistory = [ex, ...coefHistory.slice(0, 39)];
    if (runningBets[0]) {runningBets[0] = false; activeBets[0] = false}
    if (runningBets[1]) {runningBets[1] = false; activeBets[1] = false}
  }
  function showWinAlert(i) {
    playSound("win");
    _winCoef = gmCoef;
    _winUSD = bets[i]*_winCoef;
    activeBets[i] = false; runningBets[i] = false; balance+=_winUSD;
    _winShow = true;
    setTimeout(() => {
      _winShow = false;
    }, 3500);
  }
  function playAudioSegment(startTime, endTime, volume = 1) {
    let audioElement = document.getElementById('spriteAudio');
    audioElement.volume = volume;
    audioElement.currentTime = startTime;
    audioElement.play();
    const onTimeUpdate = () => {
      if (audioElement.currentTime >= endTime) {
        audioElement.pause();
        audioElement.removeEventListener('timeupdate', onTimeUpdate);
      }
    };
    audioElement.addEventListener('timeupdate', onTimeUpdate);
  }
  function playSound(type : 'start' | 'flew' | 'win' | 'click') {
    if (type == 'flew') {
      playAudioSegment(2, 4, 0.3)
    } else if (type == 'start') {
      playAudioSegment(6.6, 7, 1.0)
    } else if (type == 'win') {
      playAudioSegment(8.6, 11, 0.3)
    } else if (type == 'click') {
      playAudioSegment(0, 1.5, 0.5)
    }
  }
  onMount(async ()=>{
    window.getCoef = getCoef;
    window.onGameStart = onGameStart;
    window.onGameEnd = onGameEnd;
    window.onCoefChange = ()=>{gmCoef = window.currentCoef}
    function onResize() {
      let blh = document.querySelector('.game-area').offsetHeight - 220 + 'px';
      document.querySelector('.bet-list').style.maxHeight = blh;
      document.querySelector('.bet-list').style.minHeight = blh;
      document.querySelector('canvas').width = document.querySelector('.canv-div').offsetWidth;
      document.querySelector('canvas').height = document.querySelector('.canv-div').offsetHeight;
    }
    window.addEventListener('resize', onResize)
    onResize();
    let rmCav = await initCanvas();
    let bgM = document.getElementById('bgMusic');
    bgM.volume = 0.1;
    bgM.play();
    return () => {
      window.removeEventListener('resize', onResize)
      rmCav();
    };
  })

</script>
<svelte:head>
  <title>1win</title>
</svelte:head>

<audio id="bgMusic" src="https://aviator-demo.spribegaming.com/assets/sounds/bg_music.mp3" loop></audio>
<audio id="spriteAudio" src="https://aviator-demo.spribegaming.com/assets/sounds/sprite_audio.mp3"></audio>

<div id="main-container">
  <div class="header-top">
    <img class="block h-full py-[10px]" src="{headerTopLeft}" alt="headertopleft">
    <img class="block h-full py-[7px] ml-auto" src="{headerTopRight}" alt="headertopright">
  </div>
  <div class="header-bottom">
    <img class="block h-full py-0 -ml-[10px]" src="{headerBottomLeft}" alt="hbl">
    <div class="relative h-full py-[1px] ml-auto flex">
      <div class="bg-[rgb(35,45,69)] rounded-[10px] p-[2px] pl-[10px] flex items-center justify-center m-[2px] h-[calc(100%-4px)]">
        <div class="flex flex-col pr-[3px]">
          <div class="text-[rgb(148,166,205)] flex items-center justify-center ml-auto">
            <span class="text-[12px] px-[2px]">{data.currency}</span>
            <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" role="presentation" width="12" height="12"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.726 6.614a.953.953 0 000-1.337.928.928 0 00-1.252-.065l-.07.065L8 8.717l-3.403-3.44a.928.928 0 00-1.252-.065l-.071.065a.953.953 0 00-.064 1.265l.064.072 4.065 4.11a.928.928 0 001.251.064l.071-.065 4.065-4.109z"></path></svg>
          </div>
          <div class="text-[14px] font-bold text-white overflow-hidden text-right text-ellipsis whitespace-nowrap" style="letter-spacing: .75px;">{readableBalance}</div>
        </div>
        <div class="flex items-center justify-center pl-[3px] h-full">
          <button class="text-white flex items-center rounded-[8px] cursor-pointer h-full justify-center px-[12px] text-[13px]" style="letter-spacing: -.2px;background: linear-gradient(89deg, rgb(49, 188, 105), rgb(8, 158, 78));">Deposit</button>
        </div>
      </div>
      <img class="block h-full" src="{headerBottomRight}" alt="hbr">
    </div>
  </div>
  <div class="xbl-side">
    <div class="section mr-4">
      <div class="imglg flex flex-col scale-x-[1.04] translate-y-[-5px]">
        <img class="block" src="{xbl1}" alt="xbl">
        <img class="block" src="{xbl2}" alt="xbl">
        <img class="block" src="{xbl3}" alt="xbl">
        <img class="block" src="{xbl4}" alt="xbl">
      </div>
    </div>
    <div class="game-container max-h-[calc(100vh-130px)] overflow-y-auto relative">
      <button on:click={function(){
        document.querySelector('.game-container').requestFullscreen();
        this.style.display = 'none';
        document.querySelector('.canv-div').style.height = 'calc(100vh - 273px)';
      }} class="sticky -mr-[34px] hom z-10 top-[40px] left-[38px] bg-[#2b3843] w-[34px] h-[34px] min-w-[34px] min-h-[34px] max-w-[34px] max-h-[34px] rounded-[4px] cursor-pointer" aria-label="oij">
        <img class="scale-[.65]" src="{fullscreenIcon}" alt="oks">
      </button>

      <div class="win-alert {_winShow ? '' : 'hidden'} text-white absolute top-2.5 left-1/2 -translate-x-1/2 z-50 overflow-hidden w-[320px] bg-[#123405] border border-[#427f00] justify-around rounded-[26px] text-center flex h-[56px] items-center py-[5px] mb-4">
        <div class="multp flex flex-col justify-center w-full h-full px-2.5">
          <div class="text-[12px] leading-none text-[#9ea0a3]"> You have cashed out! </div>
          <div class="text-[20px] leading-none flex items-center justify-center mt-[3px]">{_winCoef.toFixed(2)}x</div>
        </div>
        <div class="wcl bg-[#4eaf11] w-full px-[26px] font-bold rounded-[23px] flex items-center justify-center overflow-hidden relative min-w-[120px] ml-auto h-full flex-col">
          <div class="whitespace-nowrap text-[14px] z-[2] leading-none" style="text-shadow: 0 1px 2px rgba(0,0,0,.5);">Win {data.currency}</div>
          <div class="mt-[2px] min-w-[60px] flex justify-center items-center h-[16px] text-[20px] font-bold z-[2] leading-none" style="text-shadow: 0 1px 2px rgba(0,0,0,.5);">{_winUSD.toFixed(2)}</div>
        </div>
        <button class="px-[8px] text-[#d2d2d2] cursor-pointer bg-transparent border-0 outline-0 text-2xl font-bold opacity-50 leading-none scale-y-75" style="text-shadow: 0 1px 0 #97a4ae;">x</button>
      </div>

      <div class="game-area bg-[#0e0e0e] w-full h-full relative pt-[40px]">
        <div class="header bg-[#1b1c1d] w-full h-[40px] absolute top-0 left-0 flex items-center p-[4px]">
          <div class="mx-[4px] w-[84px] h-full hicon mr-auto"></div>
          <div class="text-[#9b9c9e] text-[15px] mr-[4px]"><span class="font-bold text-[#28a909] text-[15px]">{readableBalance}</span> {data.currency}</div>
          <div class="m-[4px]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path d="M7.3476 8.4539c-.3555 0-.6426-.294-.6426-.6495 0-.3623.2803-.6494.6426-.6494h9.2969a.6448.6448 0 0 1 .6494.6494c0 .3555-.2871.6495-.6494.6495H7.3476Zm0 4.1972c-.3555 0-.6426-.2939-.6426-.6494 0-.3623.2803-.6494.6426-.6494h9.2969a.6448.6448 0 0 1 .6494.6494c0 .3555-.2871.6494-.6494.6494H7.3476Zm0 4.1973c-.3555 0-.6426-.294-.6426-.6494 0-.3623.2803-.6494.6426-.6494h9.2969a.6448.6448 0 0 1 .6494.6494c0 .3554-.2871.6494-.6494.6494H7.3476Z" fill="#767B85"/></svg></div>
          <div style="margin: 4px;width: 24px;height: 24px;cursor: pointer;background: url(https://aviator-next.spribegaming.com/chat.61cb237360b103af.svg) no-repeat center center;"></div>
        </div>
        <div class="secondary-container flex gap-1 p-[4px]">
          <div class="bet-history bg-[#1b1c1d] flex flex-col h-full min-w-[410px] rounded-[20px] p-[8px] pb-0">
            <div class="nav-switcher flex w-full h-[32px] bg-[#141516] rounded-[64px] border-4 border-[#141516]">
              <button class="grow-1 w-full h-full text-center rounded-[32px] border-0 p-0 text-[13px] bg-[#2c2d30] text-[#ebebeb] cursor-default" style="letter-spacing: -.3px;">All Bets</button>
              <button class="grow-1 w-full h-full text-center rounded-[32px] border-0 p-0 text-[#a3a3a3] text-[13px] hover:text-[#d0021b] hover:cursor-pointer transition ease-in duration-[250ms]" style="letter-spacing: -.3px;">Previous</button>
              <button class="grow-1 w-full h-full text-center rounded-[32px] border-0 p-0 text-[#a3a3a3] text-[13px] hover:text-[#d0021b] hover:cursor-pointer transition ease-in duration-[250ms]" style="letter-spacing: -.3px;">Top</button>
            </div>
            <div class="total-win-cont flex flex-col gap-[4px] w-full h-[68px] p-[8px] items-center justify-center rounded-[14px] bg-[#141516] my-[4px]">
              <div class="line1 flex w-full">
                <div class="flex mr-auto">
                  {#each dList as p}
                    <img class="block -ml-[8px] first:ml-0 w-[24px] h-[24px] rounded-full border border-[#28a90a]" src="https://aviator-demo.spribegaming.com/assets/static/avatars/v2/av-{p}.png" alt="av">
                  {/each}
                </div>
                <div class="text-[#ccc] font-bold text-[16px]">{totalPeopleWin.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              </div>
              <div class="line2 flex w-full text-[#7b7b7b] text-[12px]">
                <div class="mr-auto">
                  <span class="text-[#ccc]">{remainingPeople}/{totalPeople}</span> Bets
                </div>
                <div>Total win {data.currency}</div>
              </div>
              <div class="line3 w-full min-h-[8px] bg-[#2b2b2b80] rounded-[32px] overflow-hidden p-[2px]" role="progressbar">
                <div class="w-0 h-full bg-[#427f00] transition duration-300 ease-in-out rounded-[32px]" style="width: {(1-remainingPeople/totalPeople)*100}%;"></div>
              </div>
            </div>
            <div class="bet-head flex p-[4px] mb-[4px] justify-center items-center text-[#7b7b7b] text-[10px]" style="letter-spacing: -.2px;">
              <span class="h-[12px] w-full px-[4px] whitespace-nowrap min-w-[92px] ml-0 text-left">Player</span>
              <span class="h-[12px] w-full px-[4px] whitespace-nowrap min-w-[72px] ml-[4px] text-right">Bet {data.currency}</span>
              <span class="h-[12px] w-full px-[4px] whitespace-nowrap min-w-[72px] ml-[4px] text-right">X</span>
              <span class="h-[12px] w-full px-[4px] whitespace-nowrap min-w-[72px] ml-[4px] text-right">Win {data.currency}</span>
            </div>
            <div class="bet-list flex h-full flex-col overflow-hidden">
              {#each betHistory as h}
                <div class="flex items-center h-[32px] w-full p-[4px] mt-[4px] rounded-[32px] bg-[#101112]" style="{h.x && h.win ? 'background: linear-gradient(0deg,rgba(66,127,0,.3) 0%,rgba(66,127,0,.3) 100%),#101112;' : ''}">
                  <div class="w-full text-[12px] text-[#bbbfc5] text-right whitespace-nowrap flex items-center min-w-[92px]">
                    <img class="w-[24px] h-[24px] mr-[4px]" src="https://aviator-demo.spribegaming.com/assets/static/avatars/v2/av-{h.av}.png" alt="av">
                    <span class="px-[4px]">{h.player}</span>
                  </div>
                  <div class="w-full text-[12px] text-[#bbbfc5] text-right ml-[4px] px-[4px] whitespace-nowrap flex items-center justify-end min-w-[72px]">{h.bet?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <div class="w-full text-[12px] text-[#bbbfc5] text-right ml-[4px] px-[4px] whitespace-nowrap" style="{h.x ? 'color: ' + getColor(h.x) : ''}">{h.x}{h.x ? 'x' : ''}</div>
                  <div class="w-full text-[12px] text-[#bbbfc5] text-right ml-[4px] px-[4px] whitespace-nowrap">{h.win?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
              {/each}
            </div>
            <div class="credit flex w-full justify-center items-center py-[10px] px-[4px]">
              <button class="flex items-center h-[12px] text-[#a3a3a3] text-[10px] px-[4px] cursor-pointer mr-auto">
                <svg class="mx-[6px]" width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.999 11.1274c-.087 0-.2204-.0307-.3537-.1025-2.8916-1.5842-3.9016-2.3071-3.9016-4.1426V3.0627c0-.5947.2307-.8151.7332-1.0202.5588-.2307 2.4455-.9126 2.9992-1.087.1641-.046.3538-.087.523-.087.1743 0 .364.0358.528.087.5486.1846 2.4405.8563 2.9993 1.087.5025.2102.7332.4255.7332 1.0202v3.8196c0 1.8355-.969 2.6301-3.9016 4.1426-.1333.0667-.2666.1025-.359.1025ZM5.43 8.3076c.1948 0 .3589-.0974.4717-.2717l2.4045-3.7427c.0718-.1128.1333-.241.1333-.3589 0-.2666-.2358-.446-.4922-.446-.159 0-.3025.0923-.4153.2666l-2.1174 3.394-.9895-1.256c-.1333-.1641-.2563-.2257-.4153-.2257-.2615 0-.4717.2154-.4717.4768 0 .1282.0462.2513.1385.364l1.256 1.5279c.1488.1897.3026.2717.4974.2717Z" fill="#A3A3A3"/></svg>
                Provably Fair Game
              </button>
              <a class="h-[12px] px-[4px] flex items-center text-[#525252] text-[10px]" href="https://spribe.co">
                Powered by
                <svg class="ml-[4px]" width="36" height="10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.6052 3.4407c.013-.8134-.0586-1.6138-.9696-1.6138-.5564 0-.911.231-.911.8492 0 .693.4262.9598.9468 1.2982.5433.3514 1.552 1.0315 2.0108 1.4935.5694.5694.745 1.116.745 1.9067 0 1.7245-1.1127 2.6225-2.733 2.6225-1.9881 0-2.6974-1.142-2.6974-2.769v-.667h1.6561v.5337c-.0358.885.2246 1.5293 1.0412 1.5293.6996 0 1.0315-.3775 1.0315-1.0673 0-.5336-.2375-.898-.6638-1.2006-.8655-.693-1.9425-1.1909-2.616-2.0987-.2733-.4132-.4263-.911-.4263-1.3958C.0195 1.3062.872.457 2.6225.457c2.6388 0 2.5673 2.089 2.5803 2.987H3.6052v-.0033ZM6.7519 10V.457h3.5471c1.661 0 2.1725 1.3745 2.1725 2.7115 0 .8151-.2114 1.7292-.8697 2.2647-.5457.4467-1.279.5866-1.9474.573H8.4879V10H6.752Zm1.736-5.3956h.9311c.7572 0 1.2654-.3309 1.2654-1.487 0-1.0949-.4229-1.2586-1.4018-1.2586h-.7947v2.749-.0034ZM15.1146 5.8902V10h-1.736V.457h2.9605c1.5006 0 2.6023.5355 2.6023 2.2886 0 1.0436-.2592 2.1385-1.4257 2.3022v.0238c1.03.1399 1.3404.8152 1.3404 1.7292 0 .3957-.0512 2.7354.3718 3.015v.1774h-1.91c-.2115-.6105-.174-1.7804-.1876-2.4182-.0136-.5866 0-1.388-.5969-1.5654-.4706-.1399-.6139-.1262-1.1084-.1262h-.3104v.0068Zm0-1.3984h1.0403c.5695-.0375.9754-.4195.9754-1.3745 0-1.0675-.3922-1.2483-1.0505-1.2585h-.9652v2.633ZM20.3808 10V.457h1.736V10h-1.736ZM23.5322 10V.457h2.8035c.7435 0 1.4768.0512 1.9714.6992.3956.5218.4604 1.0675.4604 1.719 0 .8254-.1739 1.6405-1.1153 1.9986v.0239c.9789.1398 1.354.9788 1.354 2.2135 0 .3956-.0238.7878-.1227 1.1698C28.5117 9.4884 27.8398 10 26.6017 10h-3.0695Zm2.06-5.689c.4229 0 .9686.024 1.2415-.3308.1603-.2421.1875-.573.1875-1.03 0-.7128-.15-1.0675-.9413-1.0948h-.8049v2.4557h.324-.0068Zm.0512 4.2872c.3581 0 .7332.0375 1.0436-.1023.4707-.2149.5321-.839.5321-1.3233 0-1.03-.1978-1.4632-1.279-1.4632h-.6685v2.8888h.3718ZM30.1725 10V.457H35.06v1.3984h-3.1514v2.4045h2.9024v1.3984h-2.9024v2.94H35.06v1.3983h-4.8875V10Z" fill="#A3A3A3"/></svg>
              </a>
            </div>
          </div>
          <div class="main-game w-full h-full">
            <div class="coef-history h-[32px] mb-1 flex flex-wrap items-center py-1 pl-2 pr-8 overflow-hidden gap-1 relative">
              {#each coefHistory as h}
                <span class="text-[12px] py-0.5 px-1" style="color: {getColor(h)}">{h}x</span>
              {/each}
              <div class="w-[16px] h-[16px] absolute top-1/2 right-2 px-3 rounded-4xl -translate-y-1/2" style="background: #2c2d30 url(https://aviator-demo.spribegaming.com/show-more-icon.fdfdd113d7f9573e.svg) no-repeat center center/contain;"></div>
            </div>
            <div class="game-animation">
              <div class="canv-div h-[calc(100vh-402px)] min-h-[198px] relative mb-1 rounded-[20px] bg-black border border-[#2a2b2e] overflow-hidden">
                <div class="fun-mode hidden absolute top-0 left-0 z-50 w-full text-center text-[14px] font-bold rounded-t-[20px] border border-[#e59407] text-white" style="background: rgba(229,148,7,.8);">FUN MODE</div>
                <div class="playerstdiv absolute flex items-center justify-center bottom-2 right-2 p-1 rounded-2xl h-[32px] bg-[#29292980]">
                  <div class="flex mr-auto">
                    {#each dList as p}
                      <img class="block -ml-[8px] first:ml-0 w-[24px] h-[24px] rounded-full border border-[#28a90a]" src="https://aviator-demo.spribegaming.com/assets/static/avatars/v2/av-{p}.png" alt="av">
                    {/each}
                  </div>
                  <div class="text-[12px] pl-2 pr-1 text-white">{parseInt(remainingPeople*2/3)}</div>
                </div>
                <canvas id="canvas" class="w-full h-full touch-none"></canvas>
              </div>
            </div>
            <div class="bet-section flex justify-center items-center gap-1 pt-1 w-full h-[184px]">
              {#each {length: 2} as _, i}
              <div class="w-full h-full flex rounded-[20px] bg-[#1b1c1d]">
                <div class="mx-auto p-2 relative max-w-[390px] w-full h-full flex flex-col">
                  {#if i == 1}
                  <div class="absolute right-2 top-2 w-[32px] h-[32px] cursor-pointer rounded-full border-4 border-[#141516]" style="background: #2c2d30 url(https://aviator-demo.spribegaming.com/remove.aeeca15ffd0d871e.svg) no-repeat center center;"></div>
                  {/if}
                  <div class="nav w-[208px] h-[32px] mb-2 mx-auto flex bg-[#141516] rounded-[64px] border-4 border-[#141516]">
                    <button class="text-[#ebebeb] bg-[#2c2d30] cursor-default grow text-center rounded-[32px] text-[12px]" style="letter-spacing: -.3px;">Bet</button>
                    <button class="text-[#a3a3a3] cursor-pointer grow text-center rounded-[32px] text-[12px] hover:text-[#d0021b] transition duration-300 ease-in-out" style="letter-spacing: -.3px;">Auto</button>
                  </div>
                  <div class="m-auto flex justify-center gap-2 items-center pt-2 w-full">
                    <div class="bet-block flex flex-col justify-center items-center text-center w-[140px] {activeBets[i] ? 'opacity-60 prvntcur' : ''}">
                      <div class="h-[32px] text-[16px] text-center flex justify-between items-center rounded-[32px] bg-[#141516] font-bold p-1">
                        <button on:click={()=>{bets[i] = bets[i] - crate}} aria-label="minus" class="rounded-full w-[24px] h-[24px] cursor-pointer text-[#000000b3] text-center font-bold" style="background: #2c2d30 url(https://aviator-demo.spribegaming.com/minus-grey.337d79958d035ae8.svg) no-repeat center center;"></button>
                        <input type="text" inputmode="decimal" placeholder="{min_bet}" class="w-[calc(100%-35px)] border-0 outline-0 bg-transparent text-[#ccc] font-bold text-center" value={bets[i].toFixed(2)} on:focusout={function () {bets[i] = parseFloat(this.value)}}>
                        <button on:click={()=>{bets[i] = bets[i] + crate}} aria-label="plus" class="rounded-full w-[24px] h-[24px] cursor-pointer text-[#000000b3] text-center font-bold" style="background: #2c2d30 url(https://aviator-demo.spribegaming.com/plus-grey.5bf167adc606b769.svg) no-repeat center center;"></button>
                      </div>
                      <div class="flex flex-wrap gap-1 justify-center text-[14px] mt-1 text-[#9ea0a3]">
                        {#each multiplys as m}
                        <button class="w-[68px] h-[24px] bg-[#141516] cursor-pointer rounded-[64px] text-[#83878e] text-center" on:click={()=>{if (lastBbtnclk != String(m) + i){bets[i] = 0;}; bets[i] = bets[i] + m; lastBbtnclk = String(m) + i}}>{m.toLocaleString()}</button>
                        {/each}
                      </div>
                    </div>
                    {#if !activeBets[i]}
                    <button class="betbtngn max-w-[calc(100%-148px)] w-full flex flex-col justify-center items-center outline-4 outline-[#141516] text-[#fafafa] h-full min-h-[80px] text-[22px] cursor-pointer bg-[#28a909] border-1 border-[#b2f2a3] text-center rounded-[12px] p-2 hover:bg-[#36cb12] active:border-[#1c7430] active:translate-y-[1px] transition duration-300 ease-in-out" style="font-variant-numeric: lining-nums tabular-nums;" on:click={()=>{activeBets[i] = true; balance-=bets[i]; playSound('click'); invalidateAll()}}>
                      <span>Bet</span>
                      <span>{bets[i].toFixed(2)} {data.currency}</span>
                    </button>
                    {:else}
                      {#if runningBets[i] && gameStatus == 'playing'}
                      <button class="betbtngnco max-w-[calc(100%-148px)] w-full flex flex-col justify-center items-center outline-4 outline-[#141516] text-[#fafafa] h-full min-h-[80px] text-[22px] cursor-pointer bg-[#d07206] border-1 border-[#ffbd71] text-center rounded-[12px] p-2 hover:bg-[#f58708] active:border-[#c69500] active:translate-y-[1px] transition duration-300 ease-in-out" style="font-variant-numeric: lining-nums tabular-nums;" on:click={()=>{showWinAlert(i)}}>
                        <span>Cash Out</span>
                        <span>{(bets[i] * gmCoef).toFixed(2)} {data.currency}</span>
                      </button>
                      {:else}
                      <button class="betbtngncl max-w-[calc(100%-148px)] w-full flex flex-col justify-center items-center outline-4 outline-[#141516] text-[#fafafa] h-full min-h-[80px] text-[22px] cursor-pointer bg-[#cb011a] border-1 border-[#ff7171] text-center rounded-[12px] p-2 hover:bg-[#f7001f] active:border-[#b21f2d] active:translate-y-[1px] transition duration-300 ease-in-out" style="font-variant-numeric: lining-nums tabular-nums;" on:click={()=>{activeBets[i] = false; balance+=bets[i]; playSound('click')}}>
                        <span>Cancel</span>
                        {#if gameStatus == 'playing'}
                        <span class="text-[14px] font-bold opacity-80">Waiting for next round</span>
                        {/if}
                      </button>
                      {/if}
                    {/if}
                  </div>
                </div>
              </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
      <div class="mobile-footer hidden fixed z-40 h-[45px] w-full bottom-0 left-0 items-center px-[15px] bg-[#090f1e] text-white">
        <a href="/" class="flex gap-1.5 items-center mr-auto">
          <svg width="13" height="13" fill="#ffffff" data-v-62d2d3c0="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" aria-hidden="true" role="img" class="icon icon-chevron-left-bold sm margin square back-icon back-icon"><path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg>
          <span class="text-[14px] mt-[-2px]">Back</span>
        </a>
        <span class="mr-[12px] text-[14px] font-bold" style="letter-spacing: -.15px;">{data.currency} {readableBalance}</span>
        <button class="h-[28px] px-[12px] text-[14px] font-semibold rounded-[8px] cursor-pointer" style="background-image: linear-gradient(89deg, rgb(49, 188, 105), rgb(8, 158, 78))">Deposit</button>
      </div>
    </div>
  </div>
</div>


<style lang="postcss">
  @reference "tailwindcss";
  @supports (display: block) {
    :global(html) { @apply bg-[#090f1e]; }
    .header-top { @apply h-[52px] px-[15px] bg-[#090f1e] flex relative overflow-hidden; }
    .header-bottom { @apply h-[47px] px-[10px] mx-[15px] flex relative overflow-hidden rounded-[10px]; }
    .header-bottom { background-image: linear-gradient(92deg,#1e283f,rgba(20,27,46,.6)); }
    .xbl-side { @apply flex p-[15px];}
    .section { @apply rounded-[12px] flex flex-col overflow-hidden relative w-[320px] h-full max-h-[calc(100vh-130px)]; }
    .section::after {
      content: "";
      background: linear-gradient(to bottom, transparent, #141b2f);
      @apply absolute bottom-0 left-0 w-full h-12;
    }
    img {
      pointer-events: none;
      -webkit-user-drag: none;
      user-select: none;
    }
  }
  .game-container { @apply flex w-full; }
  .hicon {
    background: url('data:image/svg+xml,<svg width="108" height="28" xmlns="http://www.w3.org/2000/svg"><g fill="%23E50539" fill-rule="evenodd"><path d="m35.8316 8.4608-3.1805 12.6395c-.265 1.0105-.8613 1.8802-1.7931 2.605-.9319.7247-1.9174 1.0891-2.9489 1.0891l4.1167-16.3336H26.936l-.526 2.4765-4.0792 16.3336h4.9489c2.4145 0 4.7089-.8945 6.8872-2.6793 2.1783-1.7848 3.5616-3.8848 4.1579-6.2993l1.8387-7.355.621-2.4765h-4.9529Z"/><path d="M49.5521.7413c-.4142-.4928-.965-.7412-1.6526-.7412-.6913 0-1.321.2484-1.8966.7412-.5715.4929-.9151 1.0851-1.0272 1.7725-.1201.7166.0291 1.317.4433 1.8098.41.4929.9607.7415 1.6483.7415.6916 0 1.3251-.253 1.901-.7579.5714-.5055.9194-1.1018 1.031-1.7934.112-.6874-.0373-1.2796-.4472-1.7725m-4.6426 22.206c.0086-.0495.025-.1118.0498-.1864.0248-.0746.0415-.12.0455-.1492l3.5408-14.151h-8.204l-.6253 2.4765h3.284l-2.9484 11.6745c-.0415.1037-.0746.2486-.1077.4474-.2115 1.2798.1158 2.2944.977 3.0482.8617.7496 2.1412 1.1263 3.8436 1.1263h.737l.6293-2.4764c-.9854-.145-1.3956-.7496-1.2216-1.8099M58.5553 21.9866c-.1987.762-.6377 1.4164-1.3167 1.9588-.6792.5427-1.404.8118-2.1662.8118-1.4288 0-2.0291-.6876-1.8056-2.0709.0043-.0205.0208-.0827.0499-.182.0288-.0994.0455-.174.0536-.2236l2.373-9.4965c.3232-1.2297 1.0022-1.847 2.0377-1.847h3.5492l-2.7749 11.0494Zm4.6093 1.404c.0083-.0498.025-.0994.0458-.1492a.6234.6234 0 0 0 .0412-.145l3.6569-14.6357h-8.5352c-1.7768 0-3.429.5013-4.9575 1.4994-1.5322.9978-2.4805 2.2486-2.8492 3.748l-2.0623 8.2785c-.0455.1242-.0826.2814-.112.4805-.2276 1.379.174 2.518 1.2093 3.4164 1.0353.8987 2.3897 1.3501 4.067 1.3501h.7747c1.4532 0 2.8034-.505 4.0541-1.5158.6254 1.0108 1.7975 1.5158 3.5204 1.5158h1.739l.6257-2.4764c-.9526-.0499-1.3585-.5053-1.218-1.3666ZM87.1847 13.3021l-.0663.4059-2.0582 8.2785c-.2195.8864-.5799 1.5697-1.0768 2.0502-.4969.4802-1.0145.7204-1.557.7204-.4928 0-.8699-.2195-1.1306-.6669-.261-.443-.3312-1.0062-.2197-1.6978.0083-.0498.025-.116.054-.2028.0249-.0873.0416-.1532.0496-.203l2.0582-8.2786c.2072-.8118.5508-1.4703 1.0273-1.9755.4761-.505 1.0102-.758 1.6024-.758.493 0 .8657.2031 1.1183.609.2526.41.3232.9815.1988 1.7186m3.7686-3.4913c-1.0229-.8985-2.3687-1.3501-4.046-1.3501h-.7746c-1.826 0-3.491.5055-4.9985 1.516-1.5077 1.0105-2.4433 2.257-2.8077 3.7313l-2.1 8.2785a2.7992 2.7992 0 0 0-.1117.4805c-.2319 1.4037.1697 2.547 1.2093 3.4374 1.0355.8861 2.4061 1.3294 4.104 1.3294h.7374c1.8015 0 3.4581-.5136 4.982-1.5324 1.5241-1.023 2.464-2.2613 2.8285-3.7149l2.0956-8.2785.0786-.4762c.2238-1.3833-.174-2.522-1.1969-3.421M106.1978 8.4608c-1.996 0-3.7232.53-5.1767 1.5904l.3727-1.5904h-4.9281L91.736 27.2337h4.9532l2.5718-10.2705c.3273-1.2591.969-2.4353 1.9257-3.5285.9567-1.0975 2.0334-1.8553 3.2387-2.2736l-.5882 2.4393h2.7002l1.321-5.1396h-1.6606ZM12.6644 13.9475l.008-.0557 2.2713-8.8628c.1675-.7412.5182-1.355 1.052-1.8333.5343-.4778 1.1398-.7172 1.8012-.7172.622 0 1.076.2074 1.379.6297.295.4145.3983.9483.295 1.5863l-.0558.3345-2.2715 8.8628-.016.0557h-4.4632Zm10.337-12.545C21.8697.4701 20.3474.0002 18.4266.0002c-2.0959 0-3.937.526-5.539 1.5701-1.6019 1.044-2.6143 2.4307-3.0447 4.16l-2.0563 8.1615c-1.7374 0-3.3474.0078-4.5987.0078C1.4189 13.8996 0 15.3424 0 17.1118h6.9737L4.4313 27.2334H9.341l2.5505-10.1216h4.4711l-1.586 6.2802c-.0477.1196-.0798.279-.1116.4783-.1753 1.06.0318 1.8885.6295 2.4786.5898.5896 1.4904.8845 2.6938.8845h1.961l.6294-2.4786c-.7095-.0477-1.0044-.4304-.8845-1.1398l4.487-17.8846c.0078-.0555.024-.1514.0638-.295.0399-.1513.0557-.2472.0636-.3027.255-1.5462-.1835-2.7897-1.307-3.7302ZM76.0941 8.4608l1.1223-4.3566h-4.9532l-1.0848 4.3566h-2.431l-.6297 2.4765h2.4353l-2.957 11.712c-.0083.0497-.0288.1367-.0622.2609-.0331.1242-.0495.2071-.0579.2607-.207 1.2548.0372 2.2448.7288 2.9736.696.7248 1.7436 1.0892 3.1474 1.0892h1.7396l.6334-2.5139c-1.0186-.095-1.4412-.675-1.2669-1.735.008-.0498.0245-.112.0493-.1864.021-.0748.0377-.1204.0417-.1492l2.9527-11.712h2.108l.6297-2.4764H76.094Z"/></g></svg>') no-repeat center center/contain;
  }
  @media only screen and (max-width: 1510px) {
    .header-top, .header-bottom, .section {display: none}
    .game-container { @apply flex-col max-h-full overflow-hidden gap-4; }
    .hom { @apply hidden; }
    .xbl-side { @apply p-0; }
    .mobile-footer { display: flex; }
    .hicon { width: 72px; }
    .bet-history { min-width: 100%; }
    .bet-list { max-height: calc(80vh - 172px) !important;min-height: calc(80vh - 172px) !important; }
    .secondary-container { @apply flex-col-reverse; }
    .game-area { padding-bottom: 49px; }
    .canv-div { height: calc(100vh - 540px); }
    .bet-section { height: auto; flex-direction: column; }
  }
  .betbtngn:focus {
    box-shadow: 0 0 0 .2rem #48b46180;
  }
  .prvntcur * {
    cursor: default !important;
  }
  .wcl::before {
    content: " ";
    position: absolute;
    background: url(https://aviator-demo.spribegaming.com/win-icon-copy.6a5f7c6a70530963.svg) no-repeat;
    width: 31px;
    height: 31px;
    left: 0;
    opacity: .5;
  }
  .wcl::after {
    content: " ";
    position: absolute;
    background: url(https://aviator-demo.spribegaming.com/win-icon.2e1ac1503318fc63.svg) no-repeat;
    width: 31px;
    height: 31px;
    right: 0;
    opacity: .5;
  }
  @keyframes winAnim {
    0% {
      opacity: 0;
      visibility: hidden;
      transform: translateY(40px);
    }
    10%, 90% {
      opacity: 1;
      visibility: visible;
      transform: translateY(0px);
    }
    100% {
      opacity: 0;
      visibility: hidden;
      transform: translateY(-40px);
    }
  }
  .win-alert {
    animation: winAnim 3.1s linear forwards;
  }
</style>
