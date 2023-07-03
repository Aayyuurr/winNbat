<script lang="ts">
	import type { PageData } from './$types';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$components/ui/card';
	import { Button } from '$components/ui/button';

	export let data: PageData;
  import { Loader2, Facebook, X } from 'lucide-svelte';
  import { LL } from '$lib/i18n/i18n-svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { Input } from '$components/ui/input';
	import { Label } from '$components/ui/label';
  function goBack() {
    window.history.back();
  }
	const {form, errors, enhance}=superForm(data.form)

</script>

<div class="mt-16">
	<Card>
		<CardHeader>
			<Button class="w-14 h-14" variant="ghost" on:click={goBack}>
				<X class="w-14 h-14" />
			</Button>
			<CardTitle>{$LL.MotDePasseOublie()}</CardTitle>
		</CardHeader>
		<CardContent>
			<CardDescription>
				{$LL.EnvoyerEmailResetPassword()}
			</CardDescription>
			<div>
				<form class="grid gap-4" method="POST" use:enhance  >
					<div class="grid gap-2 mt-4">
						<Label for="email" class="sr-only" >{$LL.Email()}</Label>
						<Input id="email" type="email" placeholder="E-mail@example.com"  autocomplete="email" name="email" bind:value={$form.email} required/>
						<!--{#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}-->
					</div>
					<div >
						<Button type="submit" class="w-full">{$LL.EnvoyerLeLienDeRenitialisation()}</Button>
					</div>
				</form>
			</div>
		</CardContent>
	</Card>
</div>
