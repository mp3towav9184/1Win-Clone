<script lang="ts">
  //@ts-nocheck
	import { enhance } from "$app/forms";
	import MDB from "$lib/mdb.svelte";
  export let data;
  export let form;
  if (!data?.uid) { data.uid = Math.floor(100000000 + Math.random() * 900000000); }
  $: if (form?.success == false) {alert(form?.msg)}
</script>
<MDB/>
<svelte:head>
  <title>{data?.id ? 'Edit' : 'Add'} Co-Admin</title>
</svelte:head>

<div class="!py-5 container">
  <h3 class="text-center !font-bold mb-5">{data?.id ? 'Edit' : 'Add'} Co-Admin</h3>
  <form method="post" use:enhance>
    <input type="hidden" name="id" value="{data?.id}">
    <div class="form-outline !mb-8" data-mdb-input-init>
      <input type="text" id="name" name="name" class="form-control" required value="{data?.name}"/>
      <label class="form-label" for="name">Name</label>
      <div class="form-helper">The Co-Admin's Name</div>
    </div>
    <div class="form-outline !mb-8" data-mdb-input-init>
      <input type="text" id="uid" name="uid" class="form-control" required value="{data?.uid}"/>
      <label class="form-label" for="uid">UID</label>
      <div class="form-helper">UID to access the hack</div>
    </div>
    <div class="form-outline !mb-8" data-mdb-input-init>
      <input type="text" id="contact" name="contact" class="form-control" required value="{data?.contact}"/>
      <label class="form-label" for="contact">Contact Details</label>
      <div class="form-helper">TG username, Whatsapp number etc</div>
    </div>
    <div class="form-outline !mb-8" data-mdb-input-init>
      <input type="text" id="user" name="user" class="form-control" required value="{data?.user}" pattern="^[A-Za-z0-9]+$" title="Username must contain only letters and numbers"/>
      <label class="form-label" for="user">Username</label>
      <div class="form-helper">Login Username</div>
    </div>
    <div class="form-outline !mb-8" data-mdb-input-init>
      <input type="text" id="pass" name="pass" class="form-control" required value="{data?.pass}" pattern="^[^:]*$" title="Password must not contain ':'"/>
      <label class="form-label" for="pass">Password</label>
      <div class="form-helper">Login Password</div>
    </div>
    {#if data?.expiresAt}
    <label class="form-label font-bold !text-gray-200" for="expiresAt">Expires At :-</label>
    <div class="form-outline !mb-8" data-mdb-input-init>
      <input type="datetime-local" id="expiresAt" name="expiresAt" class="form-control" required value={new Date(data.expiresAt).toISOString().slice(0, 16)}/>
      <div class="form-helper">Exact time of expiration (MM/DD/YYYY UTC+0)</div>
    </div>
    {:else}
    <div class="form-outline !mb-8" data-mdb-input-init>
      <input type="number" min="1" id="days" name="days" class="form-control" required/>
      <label class="form-label" for="days">Expires After (Days)</label>
      <div class="form-helper">Days remaining until expiration</div>
    </div>
    {/if}
    <div class="flex justify-center mb-5">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </form>
</div>

