<style lang="scss">
    @import url(https://cdn.jsdelivr.net/gh/SebastianAigner/twemoji-amazing/twemoji-amazing.css); // from https://cdn.jsdelivr.net/gh/SebastianAigner/twemoji-amazing/twemoji-amazing.css
    @font-face {
        font-family: 'Carlito';
        src: url('$lib/fonts/Carlito-Regular.ttf') format('truetype');
        font-style: normal;
    }
    @font-face {
        font-family: 'Carlito';
        src: url('$lib/fonts/Carlito-Italic.ttf') format('truetype');
        font-style: italic;
    }
    @font-face {
        font-family: 'Carlito';
        src: url('$lib/fonts/Carlito-Bold.ttf') format('truetype');
        font-weight: bold;
    }
    @font-face {
        font-family: 'Carlito';
        src: url('$lib/fonts/Carlito-BoldItalic.ttf') format('truetype');
        font-weight: bold;
        font-style: italic;
    }

    // variables
    :global(:root){
      --text: white;
      --sec-text: #c3c7cb;
      --rounding: 15px;
      --bg: #1d2021;
      --accent: #F6FF00;
      --sec-bg: #393e46;
    }

    :root{
        text-align: center;
        color: var(--text);
        font-family: 'Carlito', sans-serif;
        background: var(--bg);
    }

    #content{
      padding: 0 260px;
    }


    nav {
      --side-spacing: 30px;
        display: flex;
        margin: -7px 0 var(--side-spacing);
        padding: 20px 50px;
        background: #2c2e31;
        justify-content: space-between;
        font-size: 1.2rem;

      div{
            flex-shrink: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        button, .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 2rem;
            background: none;
            border: none;
            width: 50px;
            flex-shrink: 0;
        }
      button{
        margin-left: var(--side-spacing);
      }
        .logo{
          margin-right: var(--side-spacing);
          img{
            height: 100%;
          }
        }
    }

    footer {
        font-size: 0.9rem;
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        a {
            display: inline-block;
        }
    }

    :global(a){
        color: var(--text);
        transition: color 0.3s ease;
        &:hover {
            color: var(--accent);
        }
    }

    :global(i span){ // alt text for icons/emojis
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    }

    :global(body) {
      margin: 0; // reset default margin
    }

    :global(*::selection){
        background: var(--accent);
        color: black;
    }

    :global(h1 span){
        color: var(--accent);
    }

    :global(h1){
      font-weight: bolder;
    }

    :global(.button){
        display: inline-block;
        padding: 10px 20px;
        margin: 10px;
        border-radius: var(--rounding);
        background-color: var(--sec-bg);
        border: #1f1d1d 1.5px solid;
        color: var(--text);
        text-decoration: none;
        transition: 0.3s ease;
      &:hover{
        transform: scale(1.05);
        box-shadow:  0 0 5px rgba(0, 0, 0, 0.5);
        color: var(--text);
      }

      &:active{
        transform: scale(0.95);
        box-shadow:  0 0 0 rgba(0, 0, 0, 0.5);
      }

    }
</style>

<script lang="ts">
    import { locale, _} from 'svelte-i18n';
    import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
    injectSpeedInsights();
    const footerSep = "&nbsp;&nbsp;•&nbsp;&nbsp;";
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let deCountries = ["germany", "austria", "switzerland", "liechtenstein"];
    let enCountries = ["united-kingdom", "australia", "united-states", "canada"];
    const userLocationArr: string[] = timezone.split("/");
    const userLocation: string = userLocationArr[0] === "Europe" ? userLocationArr[1] : userLocationArr[0]; // Europe is not needed
    let englishLocation: number = 0;
    let germanLocation : number = 0;

    // localization for english and german speaking countries (changing flag based on location)
    switch (userLocation) {
        case 'Australia':
            englishLocation = 1;
            break;
        case 'America':
            englishLocation = 2;
            break;
        case 'Canada':
            englishLocation = 3;
            break;
        case "Vienna":
            germanLocation = 1;
            break;
        case "Zurich":
            germanLocation = 2;
            break;
        case "Vaduz":
            germanLocation = 3;
            break;
    }

    function changeLocale(){
        if (($locale as string).startsWith('en')) {
            locale.set('de');
        } else {
            locale.set('en');
        }

    }
</script>
<nav>
    <div>
    <a class="logo" href="/"><img src="/favicon.svg" alt="logo"></a>
        <h1>Adam Höllerl</h1>
    </div>
    <div>
        <a class="button" href="/">{$_("home")}</a>
        <a class="button" href="/about">{$_("about")}</a>
        <a class="button" href="/contact">{$_("contact")}</a>
        <a class="button" href="/projects">{$_("projects")}</a>
    <button type="button" on:click={changeLocale}>
        {#if $locale?.startsWith('en')}<i class="twa twa-flag-{deCountries[germanLocation]??'germany'}"><span>Deutsch</span></i>
        {:else}<i class="twa twa-flag-{enCountries[englishLocation]??'united-kingdom'}" ><span>English</span></i>{/if}
    </button>
    </div>
</nav>
<div id="content">
<slot></slot>
</div>


<footer id="footer">
    <p>© {new Date(Date.now()).getFullYear()} Adam Höllerl{@html footerSep}{@html $_("made-with-love")}{@html footerSep}<a href="https://github.com/hoellerl/my-website">{$_("source")}</a></p>
</footer>