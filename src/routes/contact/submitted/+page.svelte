<script lang="ts">
    import { _ } from "svelte-i18n";
</script>

<style>
    p, a{
        font-size: var(--text-size);
    }
</style>

<svelte:head>
    <title>Adam Höllerl - {$_("contact")}</title>
</svelte:head>

<h1>{@html $_("contact-thanks") }</h1>
<p>{$_("contact-thanks-text")}</p>
<a href="/">{$_("go-back")}?</a>