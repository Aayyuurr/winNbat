<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	import { Avatar, AvatarFallback, AvatarImage } from '$components/ui/avatar';
	import { Button, buttonVariants } from '$components/ui/button';
	import { Sheet, SheetTrigger } from '$components/ui/sheet';
	import { Separator } from '$components/ui/separator';
	import ProfileChange from '$lib/components/ProfileChange.svelte';
	import { ChevronRight, Phone, MapPin, Loader2, Edit } from 'lucide-svelte';
	import { Input } from '$components/ui/input';
	import { superForm } from 'sveltekit-superforms/client';
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogTrigger,
	} from '$components/ui/dialog';
	import { Label } from '$components/ui/label';
	const { form, errors, enhance, message, delayed } = superForm(data.ChangeUsernameForm, {
		clearOnSubmit: 'none',
		multipleSubmits: 'prevent',
	});

	const {
		form: ChangeEmailFormForm,
		errors: ChangeEmailFormErrors,
		enhance: ChangeEmailFormEnhance,
		message: ChangeEmailFormMessage,
		delayed: ChangeEmailFormDelayed,
	} = superForm(data.ChangeEmailForm);
	const {
		form: ChangeMdpFormForm,
		errors: ChangeMdpFormErrors,
		enhance: ChangeMdpFormEnhance,
		message: ChangeMdpFormMessage,
		delayed: ChangeMdpFormDelayed,
	} = superForm(data.ChangeMdpForm);
	const {
		form: SetPhoneFormForm,
		errors: SetPhoneFormErrors,
		enhance: SetPhoneFormEnhance,
		message: SetPhoneFormMessage,
		delayed: SetPhoneFormDelayed,
	} = superForm(data.SetPhoneForm);
	const {
		form: SetLocationFormForm,
		errors: SetLocationFormErrors,
		enhance: SetLocationFormEnhance,
		message: SetLocationFormMessage,
		delayed: SetLocationFormDelayed,
	} = superForm(data.SetLocationForm);
	const {
		form: ChangeLangueFormForm,
		errors: ChangeLangueFormErrors,
		enhance: ChangeLangueFormEnhance,
		message: ChangeLangueFormMessage,
		delayed: ChangeLangueFormDelayed,
	} = superForm(data.ChangeLangueForm);
	const {
		form: ChangeBirthdateFormForm,
		errors: ChangeBirthdateFormErrors,
		enhance: ChangeBirthdateFormEnhance,
		message: ChangeBirthdateFormMessage,
		delayed: ChangeBirthdateFormDelayed,
	} = superForm(data.ChangeBirthdateForm);
	$: user = data.user;
</script>

<div class="bg-secondary">
	<main class="pt-7 ml-2">
		<div>
			<h1 class="text-2xl text-bold pb-2">{$LL.ProfilePage.Profil()}</h1>
		</div>
		<div>
			<div class="flex justify-center">
				<Avatar class="w-16 h-16">
					<AvatarImage src={user.logo} alt="avatar" />
					<AvatarFallback>{user.username}</AvatarFallback>
				</Avatar>
			</div>

			<div class=" flex justify-center pt-2 content-center">
				<h2 class="text-xl text-medium px-3">{user.username}</h2>
				<Dialog modal={true}>
					<DialogTrigger
						class={buttonVariants({
							variant: 'link',
							size: 'no',
						})}
					>
						<Edit size="20" strokeWidth="1.75" />
					</DialogTrigger>
					<DialogContent class="sm:max-w-[325px]">
						<DialogHeader>
							<DialogTitle>Edit profile</DialogTitle>
							<DialogDescription>
								Make changes to your profile here. Click save when you're done.
							</DialogDescription>
						</DialogHeader>
						<form method="POST" action="?/ChangeUsername" use:enhance>
							<div class="grid w-full max-w-sm items-center gap-1.5">
								<Label class="text-left" for="username">Username</Label>
								<Input type="text" name="username" bind:value={$form.username} />
							</div>

							<DialogFooter class="mt-4">
								{#if $delayed}
									<Button disabled type="submit" value="Submit">
										<Loader2 class="w-6 h-6 animate-spin" />
									</Button>
								{:else}
									<Button type="submit" value="Submit">changer le nom d'utilisateur</Button>
								{/if}
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
			</div>
			<div class="flex flex-row justify-evenly">
				<div>
					<Phone size="20" strokeWidth="1.75" />

					<Dialog modal={true}>
						<DialogTrigger
							class={buttonVariants({
								variant: 'link',
								size: 'no',
							})}
						>
							{#if !data.moreInfoUser.phone_number}
								<p>ajouter un numéro de téléphone</p>
							{:else}
								<p>{data.moreInfoUser.phone_number}</p>
							{/if}

							<Edit size="20" strokeWidth="1.75" />
						</DialogTrigger>
						<DialogContent class="sm:max-w-[325px]">
							<DialogHeader>
								<DialogTitle>Edit profile</DialogTitle>
								<DialogDescription>
									Make changes to your profile here. Click save when you're done.
								</DialogDescription>
							</DialogHeader>
							<form method="POST" action="?/SetPhone" use:SetPhoneFormEnhance>
								<div class="grid w-full max-w-sm items-center gap-1.5">
									<Label class="text-left" for="phone">phone</Label>
									<Input type="phone_number" name="phone" bind:value={$form.phone} />
								</div>

								<DialogFooter class="mt-4">
									{#if $SetPhoneFormDelayed}
										<Button disabled type="submit" value="Submit">
											<Loader2 class="w-6 h-6 animate-spin" />
										</Button>
									{:else}
										<Button type="submit" value="Submit">votre numéro de telephone</Button>
									{/if}
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>
				</div>
				<div>
					<MapPin size="20" strokeWidth="1.75" />
					<Dialog modal={true}>
						<DialogTrigger
							class={buttonVariants({
								variant: 'link',
								size: 'no',
							})}
						>
							{#if !data.moreInfoUser.wilaya}
								<p>ajouter votre adresse</p>
							{:else}
								<p>{data.moreInfoUser.wilaya}</p>
							{/if}

							<Edit size="20" strokeWidth="1.75" />
						</DialogTrigger>
						<DialogContent class="sm:max-w-[325px]">
							<DialogHeader>
								<DialogTitle>Edit profile</DialogTitle>
								<DialogDescription>
									Make changes to your profile here. Click save when you're done.
								</DialogDescription>
							</DialogHeader>
							<form method="POST" action="?/SetLocation" use:SetLocationFormEnhance>
								<div class="grid w-full max-w-sm items-center gap-1.5">
									<Label class="text-left" for="wilaya">wilaya</Label>
									<Input type="text" name="wilaya" bind:value={$form.wilaya} />
								</div>
								<div class="grid w-full max-w-sm items-center gap-1.5">
									<Label class="text-left" for="commune">commune</Label>
									<Input type="text" name="commune" bind:value={$form.commune} />
								</div>

								<DialogFooter class="mt-4">
									{#if $SetLocationFormDelayed}
										<Button disabled type="submit" value="Submit">
											<Loader2 class="w-6 h-6 animate-spin" />
										</Button>
									{:else}
										<Button type="submit" value="Submit">votre numéro de telephone</Button>
									{/if}
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>
				</div>
			</div>
			<Separator />
		</div>
	</main>
</div>
