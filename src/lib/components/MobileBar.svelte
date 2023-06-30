<script lang="ts">
	import { Search, Heart, UserCircle2 } from 'lucide-svelte';
	import { Avatar, AvatarFallback, AvatarImage } from '$components/ui/avatar';
</script>

<div class="max-h-16 w-full flex justify-evenly p-2">
	<a href="/" class="flex flex-col items-center">
		<Search class="w-7 h-7 " />
		<!-- todo
            add multi language support
        -->
		<span>Explorer</span>
	</a>
	<a href="whislists" class="flex flex-col items-center">
		<Heart class="w-7 h-7" />
		<!-- todo
            add multi language support
        -->
		<span>Favoris</span>
	</a>
	<a href="login" class="flex flex-col items-center">
		<!-- <UserCircle2 class="w-6 h-6" /> -->
		<!-- todo
            add multi language support
            add avatar card with user name
        -->
		<Avatar>
			<AvatarImage src="" alt="UserIcon" />
			<AvatarFallback>U</AvatarFallback>
		</Avatar>
		<span>Connexion</span>
	</a>
</div>
