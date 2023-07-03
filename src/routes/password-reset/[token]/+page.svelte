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
	import { InputPassword } from '$components/ui/InputPassword';
	function goBack() {
		window.history.back();
	}
	const { form, errors, enhance } = superForm(data.form);
</script>

<div class="mt-16">
	<Card>
		<CardHeader>
			<Button class="w-14 h-14" variant="ghost" on:click={goBack}>
				<X class="w-14 h-14" />
			</Button>
			<CardTitle>{$LL.VeuillezSaisirVotreNouveauMotDePasse()}</CardTitle>
		</CardHeader>
		<CardContent>
			<form class="grid gap-4" method="POST" use:enhance>
				<div class="grid gap-2">
					<Label for="password">{$LL.Password()}</Label>
					<InputPassword
						id="password"
						type="password"
						autocomplete="new-password"
						name="password"
						bind:value={$form.password}
					/>
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
				</div>
				<div>
					<Button type="submit" class="w-full">{$LL.Resetmdp()}</Button>
				</div>
			</form>
		</CardContent>
	</Card>
</div>
