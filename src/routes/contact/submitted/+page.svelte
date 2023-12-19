<script lang="ts">
    import { _ } from "svelte-i18n";
</script>

<svelte:head>
    <title>{$_("contact")} | Adam Höllerl</title>
</svelte:head>

<h2>{@html $_("contact-thanks") }</h2>
<p>{$_("contact-thanks-text")}</p>
<a href="/">{$_("go-back")}</a>