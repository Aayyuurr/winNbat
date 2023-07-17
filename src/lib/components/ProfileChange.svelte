<script lang="ts">
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogTrigger,
	} from '$components/ui/dialog';
	import { buttonVariants } from './ui/button';
	import { LL } from '$lib/i18n/i18n-svelte';
</script>

<Dialog modal={true}>
	<DialogTrigger
		class={buttonVariants({
			variant: 'link',
			size: 'no',
		})}
	>
		<slot name="Trigger" />
	</DialogTrigger>
	<DialogContent class="sm:max-w-[325px]">
		<DialogHeader>
			<DialogTitle>{$LL.ProfilePage.ChangerVotreProfile()}</DialogTitle>
			<DialogDescription>
				{$LL.ProfilePage.ChangerUnparametredeVotreProfile()}
			</DialogDescription>
		</DialogHeader>
		<slot name="form" />
	</DialogContent>
</Dialog>
