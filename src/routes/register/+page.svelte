<script lang="ts">
	import type { PageData } from './$types';

	import { X } from 'lucide-svelte';

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
	function goBack() {
		window.history.back();
	}

	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const { form, errors, enhance } = superForm(data.form);
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
</script>

<div class="mt-16">
	<Card>
		<CardHeader>
			<Button class="w-14 h-14" variant="ghost" on:click={goBack}>
				<X class="w-14 h-14" />
			</Button>
			<CardTitle>{$LL.Inscription()}</CardTitle>
		</CardHeader>
		<CardContent>
			<CardDescription class="mb-4">
				{$LL.AjouterVosInformations()}
			</CardDescription>
			<form class="grid gap-4" method="POST" use:enhance>
				<div class="grid gap-2">
					<Label for="username">{$LL.Username()}</Label>
					<Input
						id="username"
						type="text"
						placeholder=""
						autocomplete="username"
						name="username"
						bind:value={$form.username}
					/>
				</div>

				<div class="grid gap-2">
					<Label for="date">{$LL.DateDeNaissance()}</Label>
					<Input
						id="date"
						type="date"
						placeholder=""
						autocomplete="date"
						min="1920-01-01"
						max="2023-12-31"
						name="birthdate"
						bind:value={$form.birthdate}
					/>
				</div>

				<div class="grid gap-2">
					<Label for="email">{$LL.Email()}</Label>
					<Input
						id="email"
						type="email"
						placeholder="E-mail@example.com"
						autocomplete="email"
						name="email"
						bind:value={$form.email}
					/>
				</div>
				<div class="grid gap-2">
					<Label for="password">{$LL.Password()}</Label>
					<InputPassword id="password" type="password" autocomplete="new-password" name="password" bind:value={$form.password} />
				</div>
				<div class="grid gap-2 -mt-7">
					<Label for="confirm password">{$LL.ConfirmPassword()}</Label>
					<InputPassword id="new-password" type="password" autocomplete="new-password" name="confirm_password" bind:value={$form.confirm_password}/>
				</div>
				<div>
					<Button type="submit" class="w-full">{$LL.SeConnecter()}</Button>
				</div>
			</form>
		</CardContent>
	</Card>
</div>
