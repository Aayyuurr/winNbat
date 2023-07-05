<script lang="ts">
	import type { PageData } from './$types';

	import { Loader2, X } from 'lucide-svelte';

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

	const { form, errors, enhance, delayed, message } = superForm(data.form, {
		multipleSubmits: 'prevent'
	});
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
			{#if $message}
				<p class="text-secondary-foreground mb-2">
					{$LL.registerSchema.emailIsTaken()}
				</p>
			{/if}
			<form class="grid gap-4" method="POST" use:enhance>
				<div class="grid gap-2">
					<Label for="username">{$LL.Username()}</Label>
					<Input
						id="username"
						aria-label="Username"
						aria-required="true"
						aria-invalid={$errors.email ? 'true' : undefined}

						type="text"
						placeholder=""
						autocomplete="username"
						name="username"
						bind:value={$form.username}
						required
					/>
					{#if $errors.username}<span class="text-sm text-muted-foreground">{$errors.username}</span
						>{/if}
				</div>

				<div class="grid gap-2">
					<Label for="date">{$LL.DateDeNaissance()}</Label>
					<Input
						id="date"
						type="date"
						aria-label="Date"
						aria-required="true"
						aria-invalid={$errors.birthdate ? 'true' : undefined}
						placeholder=""
						autocomplete="date"
						min="1920-01-01"
						max="2023-12-31"
						name="birthdate"
						bind:value={$form.birthdate}
						required
					/>
					{#if $errors.birthdate}<span class="text-sm text-muted-foreground"
							>{$errors.birthdate}</span
						>{/if}
				</div>

				<div class="grid gap-2">
					<Label for="email">{$LL.Email()}</Label>
					<Input
						aria-label="Email"
						aria-required="true"
						aria-invalid={$errors.email ? 'true' : undefined}
						id="email"
						type="email"
						placeholder="E-mail@example.com"
						autocomplete="email"
						name="email"
						required
						bind:value={$form.email}
					/>
					{#if $errors.email}<span class="text-sm text-muted-foreground">{$errors.email}</span>{/if}
				</div>
				<div class="grid gap-2">
					<Label for="password">{$LL.Password()}</Label>
					<InputPassword
						id="password"
						type="password"
						autocomplete="new-password"
						name="password"
						bind:value={$form.password}
					/>
					{#if $errors.password}<span class="text-sm -mt-6 mb-6 text-muted-foreground"
							>{$errors.password}</span
						>{/if}
				</div>
				<div class="grid gap-2 -mt-7">
					<Label for="confirm password">{$LL.ConfirmPassword()}</Label>
					<InputPassword
						id="new-password"
						type="password"
						autocomplete="new-password"
						name="confirm_password"
						bind:value={$form.confirm_password}
					/>
					{#if $errors.confirm_password}<span class="text-sm -mt-6 mb-6 text-muted-foreground"
							>{$errors.confirm_password}</span
						>{/if}
				</div>
				<div>
					<Button type="submit" class="w-full">
						{#if $delayed}
							<Loader2 class="w-6 h-6 animate-spin" />
						{:else}
							{$LL.SeConnecter()}
						{/if}
					</Button>
				</div>
			</form>
		</CardContent>
	</Card>
</div>
