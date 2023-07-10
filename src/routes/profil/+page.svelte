<script lang="ts">
	import { LL } from '$lib/i18n/i18n-svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	import { Avatar, AvatarFallback, AvatarImage } from '$components/ui/avatar';
	import { Button } from '$components/ui/button';
	import { Sheet, SheetTrigger } from '$components/ui/sheet';
	import { Separator } from '$components/ui/separator';
	import ProfileChange from '$lib/components/ProfileChange.svelte';
	import { ChevronRight,Phone ,MapPin } from 'lucide-svelte';
	const user = data.user;
</script>

<div class='bg-secondary'>
	<main>
		<div>
			<h1 class='text-xl text-bold'>{$LL.ProfilePage.Profil()}</h1>
		</div>
		<div>
			<div>
				<Avatar  class='w-16 h-16'>
					<AvatarImage src={user.logo} alt="avatar" />
					<AvatarFallback>{user.username}</AvatarFallback>
				</Avatar>
			</div>

			<div>
				<h2>{user.username}</h2>
			</div>
			<div>
				<div>
					<Phone size='20' strokeWidth='1.75'/>
					<Sheet>
						<SheetTrigger>
							<Button variant="link">
								{#if data.moreInfoUser === null}
									{$LL.ProfilePage.CreerUnProfile()}
								{:else}
									{$LL.ProfilePage.CreerUnProfile()}
								{/if}
							</Button>
						</SheetTrigger>
						<ProfileChange />
					</Sheet>
				</div>
				<div>
					<MapPin size='20' strokeWidth='1.75' />
					<Sheet>
						<SheetTrigger>
							<Button variant="link">
								{#if data.moreInfoUser === null}
									{$LL.ProfilePage.CreerUnProfile()}
								{:else}
									{$LL.ProfilePage.CreerUnProfile()}
								{/if}
							</Button>
						</SheetTrigger>
						<ProfileChange />
					</Sheet>
				</div>





			</div>
			<Separator />
		</div>

	</main>
</div>



