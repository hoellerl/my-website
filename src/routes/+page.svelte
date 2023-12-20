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
    text-align: left;
  }

  img {
      display: inline-block;
      height: 200px;
      margin: -30px auto -30px 80px;
  }

    h1 {
        font-size: var(--text-size-huge);
        margin-bottom: 0;
    }
    p{
        font-size: var(--text-size-medium);
        color: var(--sec-text);

    }
</style>

<div class="centered-content">
  <h1>{$_("greeting")}<span>Adam</span><img src="/hand.webp" alt="waving-hand"/></h1>
  <p>{@html $_("summary")}</p>
</div>