<script lang="ts">
  //@ts-nocheck
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import MDB from "$lib/mdb.svelte";
	import { onMount } from "svelte";
  export let form;
  let btnDis = true;
  $: if (form) {window?.turnstile?.reset(); btnDis = true}
  $: if (form?.success == false) {alert(form?.msg)}
  function onTurnstileSolve(token) {
    btnDis = false;
  }
  onMount(()=>{
    window.ots = onTurnstileSolve
  })
</script>
<MDB/>
<svelte:head>
  <title>Login</title>
  <script>function cb (t) {window.ots(t)}</script>
  <script defer src="https://challenges.cloudflare.com/turnstile/v0/api.js"></script>
</svelte:head>

<form class="min-w-screen min-h-screen flex items-center justify-center p-3" method="post" use:enhance>
  <div class="card w-full max-w-96">
    <div class="card-body">
      <h3 class="card-title text-center !mb-6">Login</h3>
      <div class="form-outline mb-3" data-mdb-input-init>
        <input type="text" id="user" name="user" class="form-control" required />
        <label class="form-label" for="user">Username</label>
      </div>
      <div class="form-outline mb-3" data-mdb-input-init>
        <input type="password" id="pass" name="pass" class="form-control" required />
        <label class="form-label" for="pass">Password</label>
      </div>
      <div class="cf-turnstile mb-3 flex justify-center" data-sitekey="0x4AAAAAABjKbk9bBf3923iu" data-callback="cb"></div>
      <div class="flex justify-center">
        <button class="btn btn-{btnDis && 'outline-' || ''}primary btn-rounded" disabled="{btnDis}" data-mdb-ripple-init data-mdb-ripple-color="dark">Login</button>
      </div>
    </div>
  </div>
</form>
