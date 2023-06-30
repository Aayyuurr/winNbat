<script>
	import '../reset.css';
	import '../app.postcss';
	import MobileBar from '$lib/components/MobileBar.svelte';
</script>

<div>
	<slot />
</div>

<style>
	div {
		max-width: 320px;
		border: 1px solid black;
		margin: 0 auto;
	}
</style>
