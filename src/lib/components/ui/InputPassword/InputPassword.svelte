<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements";
    import { cn } from "$lib/utils";

    let className: string | undefined | null = undefined;
    export let autocomplete: HTMLInputAttributes["autocomplete"] = "current-password";
    export let value: HTMLInputAttributes["value"] = undefined;
    export { className as class };
    let afficher:boolean = false;
    export let id: string | undefined= "password";
    function showPassword(id:string){
        afficher = !afficher;
        if(afficher){
            document.getElementById(id).setAttribute("type","text")
        }else{
            document.getElementById(id).setAttribute("type","password");
        }
    }
    import { LL } from '$lib/i18n/i18n-svelte';

</script>
<div >
    <input
            class={cn(
		"flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
		className
	)}
            id="{id}"
            bind:value
            on:blur
            on:change
            on:click
            on:focus
            on:keydown
            on:keypress
            on:keyup
            on:mouseover
            on:mouseenter
            on:mouseleave
            on:paste
            on:input
            {autocomplete}
            {...$$restProps}
            required

    />
    <button on:click={showPassword(id)}
            class="
            text-red-600
            text-xs
            relative
            left-52
            bottom-9
        "
    type="button">
        {#if afficher}
            {$LL.Afficher()}
        {:else}
            {$LL.Masquer()}
        {/if}
    </button>
</div>
