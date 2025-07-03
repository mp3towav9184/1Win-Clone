<script lang="ts">
	import { enhance } from "$app/forms";
	import MDB from "$lib/mdb.svelte";
  export let data;
</script>
<MDB/>
<svelte:head>
  <title>Co-Admin Manager</title>
</svelte:head>

<div class="!py-5 container">
  <h3 class="text-center !font-bold">Co Admins</h3>
  <div class="!my-5 flex gap-3">
    <form method="get" class="input-group input-group-lg block">
      <input type="text" class="form-control" placeholder="Search Username..." name="user"/>
      <button class="btn btn-primary" data-mdb-ripple-init data-mdb-ripple-color="dark" aria-label="search">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
      </button>
    </form>
    <a class="btn btn-lg btn-success btn-floating relative aspect-square" aria-label="add" data-mdb-ripple-init data-mdb-ripple-color="dark" href="/co-admin-manager/edit">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="absolute top-0 left-0 w-full h-full scale-[.65]" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
      </svg>
    </a>
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-hover table-bordered">
      <thead>
        <tr>
          <th scope="col" class="!font-bold">Name</th>
          <th scope="col" class="!font-bold">Contact</th>
          <th scope="col" class="!font-bold">Username</th>
          <th scope="col" class="!font-bold whitespace-nowrap">Expires in</th>
          <th scope="col" class="!font-bold">Action</th>
        </tr>
      </thead>
      <tbody class="table-group-divider !border-t-slate-300/25">
        {#each data.entries as i}
        <tr>
          <td class="whitespace-nowrap">{i.name}</td>
          <td class="whitespace-nowrap">{i.contact}</td>
          <td class="whitespace-nowrap">{i.user}</td>
          <td class="whitespace-nowrap">{i.days}</td>
          <td class="flex gap-3">
            <a class="btn btn-sm btn-outline-warning btn-floating relative aspect-square" data-mdb-ripple-init data-mdb-ripple-color="dark" href="/co-admin-manager/edit?id={i.id}" aria-label="edit">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="absolute top-0 left-0 w-full h-full scale-[.6]" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
              </svg>
            </a>
            <form action="?/delete" method="post" use:enhance>
              <button class="btn btn-sm btn-outline-danger btn-floating relative aspect-square" data-mdb-ripple-init data-mdb-ripple-color="dark" aria-label="delete" name="id" value="{i.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="absolute top-0 left-0 w-full h-full scale-[.6]" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
              </button>
            </form>
          </td>
        </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>