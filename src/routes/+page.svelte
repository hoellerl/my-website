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
        & img {
          display: inline-block;
            width: 150px;
            height: 150px;
            margin-left: 80px;
      }
  }

    h1 {
        font-size: 6rem;
        margin-bottom: 0;
    }
    p{
        font-size: 2.5rem;
        color: var(--sec-text);

    }
</style>

<div class="centered-content">
  <h1>{$_("greeting")}<span>Adam</span><img src="/hand.png" alt="waving-hand"/></h1>
  <p>{@html $_("summary")}</p>
</div>