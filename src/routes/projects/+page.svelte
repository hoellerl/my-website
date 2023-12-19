

<script lang="ts">
    import RepoCards from "./RepoCards.svelte";
    import { _ } from "svelte-i18n";

</script>


<svelte:head>
    <title>{$_("projects")} | Adam Höllerl</title>
</svelte:head>

<h1>{@html $_("projects-header")}</h1>
<RepoCards />
