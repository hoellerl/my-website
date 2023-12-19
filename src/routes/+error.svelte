<script lang="ts">
    import { _ } from "svelte-i18n";
</script>

<svelte:head>
    <title>404 | Adam Höllerl</title>
</svelte:head>

<h1><span>Sorry,</span> {$_("404-sorry")}</h1>
<a href="/">{$_("go-back")}</a>