<script>
	import '../reset.css';
	import '../app.postcss';
	import MobileBar from '$lib/components/MobileBar.svelte';
	import { setLocale } from '$lib/i18n/i18n-svelte';
	export let data;
	setLocale(data.locale);
</script>

<div>
	<main>
		<slot />
	</main>
	<MobileBar user={data.user} />
</div>

<style>
</style>
