<script lang="ts">
    import { _ } from "svelte-i18n";
</script>

<svelte:head>
    <title>Adam Höllerl</title>
</svelte:head>


<h1>{$_("greeting")}<span>Adam</span> <i class="twa twa-waving-hand"><span>waving-hand</span></i></h1>
<p>{$_("summary")}</p>
