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
    align-items: center;
    min-height: calc(100vh - 300px);
  }

    h1 {
        font-size: 5rem;
        margin-bottom: 0;
    }
    p{
        font-size: 1.6rem;
        margin-top: 0;
        color: var(--sec-text);

    }
</style>

<div class="centered-content">
  <h1>{$_("greeting")}<span>Adam</span> <i class="twa twa-waving-hand"><span>waving-hand</span></i></h1>
  <p>{$_("summary")}</p>
</div>