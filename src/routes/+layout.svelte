<script>
	import '../reset.css';
	import '../app.postcss';
	import MobileBar from '$lib/components/MobileBar.svelte';
	import { setLocale } from '$lib/i18n/i18n-svelte';
	export let data;
	setLocale(data.locale);
</script>

<div>
	<slot />
</div>

<style>
	div {
		max-width: 320px;
		margin: 0 auto;
	}
</style>
