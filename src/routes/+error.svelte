<script lang="ts">
    import { _ } from "svelte-i18n";
</script>

<style lang="scss">
    span{
      font-size: calc(var(--text-size-large) + 1rem);
    }
    a{
        font-size: var(--text-size);
    }
</style>

<svelte:head>
    <title>404 | Adam Höllerl</title>
</svelte:head>

<h1><span>Sorry,</span><br> {$_("404-sorry")}</h1>
<a href="/">{$_("go-back")}</a>