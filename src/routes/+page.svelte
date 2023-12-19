<script lang="ts">
    import { _ } from "svelte-i18n";
</script>

<svelte:head>
    <title>Adam Höllerl</title>
</svelte:head>


<style>
  .centered-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: calc(100vh - 300px);
  }

    h1 {
        font-size: 5rem;
        margin-bottom: 0;
    }
    p{
        font-size: 2rem;
        color: var(--sec-text);

    }
</style>

<div class="centered-content">
  <h1>{$_("greeting")}<span>Adam</span> <i class="twa twa-waving-hand"/></h1>
  <p>{@html $_("summary")}</p>
</div>