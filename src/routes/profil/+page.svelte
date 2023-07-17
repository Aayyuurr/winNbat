<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	import { Avatar, AvatarFallback, AvatarImage } from '$components/ui/avatar';
	import { Button, buttonVariants } from '$components/ui/button';
	import { Sheet, SheetTrigger } from '$components/ui/sheet';
	import { Separator } from '$components/ui/separator';
	import ProfileChange from '$lib/components/ProfileChange.svelte';
	import { ChevronRight, Phone, MapPin, Loader2, Edit, Check, AlertCircle } from 'lucide-svelte';
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
	const {
		form: ChangeUsernameFormForm,
		errors: ChangeUsernameFormErrors,
		enhance: ChangeUsernameFormEnhance,
		message: ChangeUsernameFormMessage,
		delayed: ChangeUsernameFormDelayed,
	} = superForm(data.ChangeUsernameForm, {
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
	let algeria = data.algeria;
	let wilaya = algeria.map((wilaya) => wilaya.wilaya_name);
	wilaya = [...new Set(wilaya)];
	// let commune = algeria.map((commune) => commune.commune_name);
	// commune = [...new Set(commune)];
	$: commune = algeria.filter((alg) => {
		if (alg.wilaya_name === $SetLocationFormForm.wilaya) {
			return alg.commune_name;
		}
	});
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle,
	} from '$components/ui/card';
	import { page } from '$app/stores';
	import { Alert, AlertDescription, AlertTitle } from '$components/ui/alert';
	$: {
		console.log($page.status);
	}
</script>

<div class="">
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

			<div class=" flex justify-center pt-2 pb-4 content-center">
				<h2 class="text-xl text-medium px-3">{user.username}</h2>
				<ProfileChange>
					<Edit size="20" strokeWidth="1.75" slot="Trigger" />

					<form method="POST" action="?/ChangeUsername" use:ChangeUsernameFormEnhance slot="form">
						{#if $ChangeUsernameFormMessage && $page.status === 200}
							<Alert>
								<Check class="h-4 w-4" />
								<AlertTitle>{$LL.MessageNotification.Succes()}</AlertTitle>
								<AlertDescription
									>{$LL.MessageNotification.NomUtilisateurBienChanger()}</AlertDescription
								>
							</Alert>
						{:else if $ChangeUsernameFormMessage && $page.status == 409}
							<Alert>
								<AlertCircle class="h-4 w-4" />
								<AlertTitle>{$LL.MessageNotification.Error()}</AlertTitle>
								<AlertDescription>{$LL.registerSchema.usernameIsTaken()}</AlertDescription>
							</Alert>
						{:else if $ChangeUsernameFormMessage && $page.status == 500}
							<Alert>
								<AlertCircle class="h-4 w-4" />
								<AlertTitle>{$LL.MessageNotification.Error()}</AlertTitle>
								<AlertDescription>{$LL.MessageNotification.ErrorEstSurvenu()}</AlertDescription>
							</Alert>
						{/if}
						<div class="grid w-full max-w-sm items-center gap-1.5">
							<Label class="text-left py-2" for="username">{$LL.Username()}</Label>
							<Input
								type="text"
								aria-invalid={$ChangeUsernameFormErrors.username ? 'true' : undefined}
								name="username"
								bind:value={$ChangeUsernameFormForm.username}
								autoComplete="username"
								required
							/>
							{#if $ChangeUsernameFormErrors.username}<span class="text-sm text-muted-foreground"
									>{$ChangeUsernameFormErrors.username}</span
								>{/if}
						</div>

						<DialogFooter class="mt-4">
							{#if $ChangeUsernameFormDelayed}
								<Button disabled type="submit" value="Submit">
									<Loader2 class="w-6 h-6 animate-spin" />
								</Button>
							{:else}
								<Button type="submit" value="Submit"
									>{$LL.ProfilePage.ChangerLenomDutilisateur()}</Button
								>
							{/if}
						</DialogFooter>
					</form>
				</ProfileChange>
			</div>
			<div class="flex flex-row gap-7">
				<div>
					<ProfileChange>
						<div slot="Trigger" class="flex gap-3">
							<Phone size="20" strokeWidth="1.75" />
							{#if !data.moreInfoUser.phone_number}
								<p>{$LL.ProfilePage.AjouterUnNumeroDeTelephone()}</p>
							{:else}
								<p>{data.moreInfoUser.phone_number}</p>
							{/if}
							<Edit size="20" strokeWidth="1.75" />
						</div>
						<form method="POST" action="?/SetPhone" use:SetPhoneFormEnhance slot="form">
							{#if $SetPhoneFormMessage && $page.status === 200}
								<Alert>
									<Check class="h-4 w-4" />
									<AlertTitle>{$LL.MessageNotification.Succes()}</AlertTitle>
									<AlertDescription
										>{$LL.MessageNotification.VousAvezChangerModifierVotreNumeroDeTelephone()}</AlertDescription
									>
								</Alert>
							{:else if $SetPhoneFormMessage && $page.status == 500}
								<Alert>
									<AlertCircle class="h-4 w-4" />
									<AlertTitle>{$LL.MessageNotification.Error()}</AlertTitle>
									<AlertDescription>{$LL.MessageNotification.ErrorEstSurvenu()}</AlertDescription>
								</Alert>
							{/if}
							<div class="grid w-full max-w-sm items-center gap-1.5">
								<Label class="text-left py-2" for="phone">{$LL.PhoneNumbre()}</Label>
								<Input
									type="phone_number"
									name="phone"
									bind:value={$SetPhoneFormForm.phone}
									aria-invalid={$SetPhoneFormErrors.phone ? 'true' : undefined}
									required
									autoComplete="phone_number"
								/>
								{#if $SetPhoneFormErrors.phone}<span class="text-sm text-muted-foreground"
										>{$SetPhoneFormErrors.phone}</span
									>{/if}
							</div>

							<DialogFooter class="mt-4">
								{#if $SetPhoneFormDelayed}
									<Button disabled type="submit" value="Submit">
										<Loader2 class="w-6 h-6 animate-spin" />
									</Button>
								{:else}
									<Button type="submit" value="Submit"
										>{$LL.ProfilePage.ConfirmerLeNumeroDeTelephone()}</Button
									>
								{/if}
							</DialogFooter>
						</form>
					</ProfileChange>

					<div>
						<ProfileChange>
							<div slot="Trigger" class="flex gap-3">
								{#if !data.moreInfoUser.wilaya}
									<MapPin size="20" strokeWidth="1.75" />
									<p>{$LL.ProfilePage.AjouterUneAdresse()}</p>
									<Edit size="20" strokeWidth="1.75" />
								{:else}
									<MapPin size="20" strokeWidth="1.75" />
									<p>{data.moreInfoUser.wilaya}</p>
									<Edit size="20" strokeWidth="1.75" />
								{/if}
							</div>
							<form method="POST" action="?/SetLocation" use:SetLocationFormEnhance slot="form">
								{#if $SetLocationFormMessage && $page.status === 200}
									<Alert>
										<Check class="h-4 w-4" />
										<AlertTitle>{$LL.MessageNotification.Succes()}</AlertTitle>
										<AlertDescription
											>{$LL.MessageNotification.VousAvezChangerModifierVotreAdresse()}</AlertDescription
										>
									</Alert>
								{:else if $SetLocationFormMessage && $page.status == 500}
									<Alert>
										<AlertCircle class="h-4 w-4" />
										<AlertTitle>{$LL.MessageNotification.Error()}</AlertTitle>
										<AlertDescription>{$LL.MessageNotification.ErrorEstSurvenu()}</AlertDescription>
									</Alert>
								{/if}
								<div class="grid w-full max-w-sm items-center gap-1.5">
									<Label class="text-left m-2" for="wilaya">{$LL.wilaya()}</Label>
									<select
										class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
										name="wilaya"
										bind:value={$SetLocationFormForm.wilaya}
									>
										{#each wilaya as wil}
											<option value={wil}>{wil}</option>
										{/each}
									</select>
								</div>
								<div class="grid w-full max-w-sm items-center gap-1.5">
									<Label class="text-left m-2" for="commune">{$LL.commune()}</Label>
									<select
										class="flex h-10 w-full rounded-md border border-input
										bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0
										file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground
										focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
										focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
										name="commune"
										bind:value={$SetLocationFormForm.commune}
									>
										{#each commune as com}
											<option value={com.commune_name}>{com.commune_name}</option>
										{/each}
									</select>
								</div>

								<DialogFooter class="mt-4">
									{#if $SetLocationFormDelayed}
										<Button disabled type="submit" value="Submit">
											<Loader2 class="w-6 h-6 animate-spin" />
										</Button>
									{:else}
										<Button type="submit" value="Submit"
											>{$LL.ProfilePage.ConfimerVotreAdresse()}</Button
										>
									{/if}
								</DialogFooter>
							</form>
						</ProfileChange>
					</div>
				</div>
			</div>
		</div>
		<Separator class="my-2" />
		<a href="/profil/createad">
			<Card class="my-2 w-[420px] mx-auto">
				<CardContent>
					<CardTitle tag="h1" class="my-4">{$LL.ProfilePage.MetterVotreLogement()}</CardTitle>
					<CardDescription class="grid grid-cols-4  grid-rows-1  ">
						<h3 class=" place-self-center text-base col-span-3 font-medium">
							{$LL.ProfilePage.GagnerDeLargent()}
						</h3>
						<img src="/Umrella.png" alt="plage " width="100" height="100" />
					</CardDescription>
				</CardContent>
			</Card>
		</a>
		<Separator />
		<div class="flex flex-col">
			<Separator />
			<Button variant="link">Changer progile</Button>
			<Separator />
			<Button variant="link">azeaz</Button>
			<Separator />
			<Button variant="link">azeaz</Button>
			<Separator />
			<Button variant="link">sqdqsd</Button>
			<Separator />
			<Button variant="link">sqdqsd</Button>
			<Separator />
		</div>
	</main>
</div>
