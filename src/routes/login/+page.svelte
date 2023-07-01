<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { Loader2, Facebook, X } from 'lucide-svelte';
	import { Button } from '$components/ui/button';
	import { Input } from '$components/ui/input';
	import { Label } from '$components/ui/label';
    import { InputPassword } from '$components/ui/InputPassword';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$components/ui/card';
	import { LL } from '$lib/i18n/i18n-svelte';
	export let data: PageData;
	// Client API:
	const { form, errors,enhance   } = superForm(data.form);
	// let isLoading = false;
	function goBack() {
		window.history.back();
	}
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
</script>
<SuperDebug data={$form} />
<div class="mt-16">
	<Card >
		<CardHeader>
			<Button class="w-14 h-14" variant="ghost" on:click={goBack}>
				<X class="w-14 h-14" />
			</Button>
			<CardTitle>{$LL.connexion()}</CardTitle>
		</CardHeader>
		<CardContent class="grid gap-4">
			<div class="grid grid-cols-2 gap-6">
				<Button variant="secondary" href="/api/oauth?provider=facebook">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mr-2 h-4 w-4"
						height="1em"
						viewBox="0 0 512 512"
						><path
							d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
						/></svg
					>

					Facebook
				</Button>
				<Button  variant="secondary" href="/api/oauth?provider=google">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="1em"
						viewBox="0 0 488 512"
						class="mr-2 h-4 w-4"
						><path
							d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
						/></svg
					>

					Google
				</Button>
			</div>
			<div class="relative">
				<div class="absolute inset-0 flex items-center">
					<span class="w-full border-t" />
				</div>
				<div class="relative flex justify-center text-xs uppercase">
					<span class="bg-background px-2 text-muted-foreground"> {$LL.ou()} </span>
				</div>
			</div>
			<form class="grid gap-4" method="POST" action="/login" use:enhance >
<!--				todo

					add autofocus
					add validation
					add error message
					add forgot password
-->
				<div class="grid gap-2">
					<Label for="email">{$LL.Email()}</Label>
					<Input id="email" type="email" placeholder="E-mail@example.com"  autocomplete="email" bind:value={$form.email} />
					{#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}
				</div>
				<div class="grid gap-2">
					<Label for="password">{$LL.Password()}</Label>
					<InputPassword id="password" type="password" bind:value={$form.password}  />
					{#if $errors.password}<span class="invalid">{$errors.password}</span>{/if}
					<a  href="/forgot" class="text-secondary-foreground text-xs -mt-7">{$LL.MotDePasseOublie()}</a>

				</div>
				<div >
					<Button type="submit" class="w-full">{$LL.SeConnecter()}</Button>
				</div>
			</form>

		</CardContent>
		<CardFooter>
			<CardDescription>
				<p class="text-center ">
					{$LL.VousAvezPasDeCompte()}<a href="/sign-up" class="text-secondary-foreground">{$LL.InscrivezVous()}</a>
				</p>
			</CardDescription>
		</CardFooter>
	</Card>
</div>

<style>
</style>
