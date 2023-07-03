<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData, PageData } from './$types';
  import { LL } from '$lib/i18n/i18n-svelte';
  import Input from "$lib/components/ui/input/Input.svelte";
  import Button from "$lib/components/ui/button/Button.svelte";

  export let data: PageData;
</script>
<div>
  <h1>{$LL.ConfirmerVotreEmail()}</h1>
  <p>{$LL.PleaseCheckYourEmail()}</p>

  <form method="POST" use:enhance>
    <p>{$LL.SiPasRecuEmail()}</p> <Button type="submit">{$LL.RenvoyerEmail()}</Button>
  </form>
</div>
