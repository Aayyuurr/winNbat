<script lang="ts">
	import { Search, Heart, Luggage, MessageSquare, UserCircle2 } from 'lucide-svelte';
	import { Avatar, AvatarFallback, AvatarImage } from '$components/ui/avatar';
	export let user = null;
</script>

<nav class="flex flex-row w-full justify-around fixed bottom-0 shadow-2xl pt-2 sm:hidden">
	<div class="h-full">
		<a href="/" class="flex flex-col items-stretch justify-between h-full hover:text-red-600">
			<span class="flex justify-center">
				<Search size="28" />
			</span>
			<span>Explorer</span>
		</a>
	</div>
	<div class="h-full">
		<a
			href="/favoris"
			class="flex flex-col items-stretch justify-between h-full hover:text-red-600"
		>
			<span class="flex justify-center">
				<Heart size="28" />
			</span>
			<span>Favoris</span></a
		>
	</div>
	<div class="h-full">
		<a
			href="/voyages"
			class="flex flex-col items-stretch justify-between h-full hover:text-red-600"
		>
			<span class="flex justify-center">
				<Luggage size="28" />
			</span>
			<span> Voyages </span>
		</a>
	</div>
	<div class="h-full">
		<a
			href="/messages"
			class="flex flex-col items-stretch justify-between h-full hover:text-red-600"
		>
			<span class="flex justify-center">
				<MessageSquare size="28" />
			</span>
			<span> Messages </span>
		</a>
	</div>
	<div class="h-full">
		<a href="/profil" class="flex flex-col items-stretch justify-between h-full hover:text-red-600">
			{#if !user}
				<span class="flex justify-center">
					<UserCircle2 size="28" />
				</span>
				<span> Profile </span>
			{:else}
				<span class="flex justify-center">
					<Avatar>
						<AvatarImage src={user.logo} alt="avatar" />
						<AvatarFallback>{user.username}</AvatarFallback>
					</Avatar>
				</span>
				<span> Profile </span>
			{/if}
		</a>
	</div>
</nav>
