<style lang="scss">
    @font-face {
        font-family: 'ABeeZee';
        src: url('$lib/fonts/ABeeZee-Regular.ttf') format('truetype');
        font-style: normal;
    }

    @font-face {
        font-family: 'ABeeZee';
        src: url('$lib/fonts/ABeeZee-Italic.ttf') format('truetype');
        font-style: italic;
    }

    :root{
        color: wheat;
        font-family: 'ABeeZee', sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #222225;
        --rounding: 10px;
    }

    nav {
      margin-top: -15px;
      padding: 20px;
      width: fit-content;
      background: darkslategray;
      border-radius: var(--rounding);
      display: flex;
      justify-content: center;
      align-items: center;

    a, button {
        padding: 15px 25px;
        margin: 0 10px;
        text-decoration: none;
        color: #000;
        border-radius: var(--rounding);
        background-color: #ddd;
        border: 1px solid #000;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #bbb;
        }
    }
}
</style>

<script lang="ts">
    import { locale, _ } from 'svelte-i18n';

    function changeLocale(){
        if (($locale as string).startsWith('en')) {
            locale.set('de')
        } else {
            locale.set('en')
        }

    }
</script>

<nav>
    <a href="/">{$_("home")}</a>
    <a href="/about">{$_("about")}</a>
    <a href="/contact">{$_("contact")}</a>
    <a href="/projects">{$_("projects")}</a>
    <button type="button" on:click={changeLocale}>
    {#if $locale?.startsWith('en')}🇩🇪{:else}🇬🇧{/if}</button>
</nav>
<slot></slot>