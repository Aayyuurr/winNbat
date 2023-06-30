<script lang="ts">
	import { Avatar as AvatarPrimitive } from 'radix-svelte';
	import { cn } from '$lib/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<AvatarPrimitive.Root
	class={cn('relative flex h-7 w-7 shrink-0 overflow-hidden rounded-full', className)}
	{...$$restProps}
>
	<slot />
</AvatarPrimitive.Root>
