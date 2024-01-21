<script>
    import {_} from "svelte-i18n";
</script>

<style lang="scss">
    .lang{
        width: 40px;
        height: 40px;
        margin: 7px;
    }

    .lang-div{
        padding: 10px;
        display: flex;
        flex-wrap: wrap;
        width: fit-content;
        justify-content: center;
        border-radius: 15px;
        background-color: var(--sec-bg);
        margin: 0 20px;
    }

    #tech-stack{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 0 20px;
    }

    h2{
        font-size: var(--text-size-medium);
        margin: 40px 0 0 0;
    }

    h3{
        font-size: calc(var(--text-size-small) + 0.4rem);
    }

    p{
        font-size: var(--text-size-small);
      text-align: justify;
      line-height: 30px;

    }

    @media only screen and (max-width: 1024px) {
      // make the two-inputs divs stack on top of each other
      p{
        text-align: left;
      }

    }

</style>


<svelte:head>
    <title>Adam Höllerl - {$_("about")}</title>
</svelte:head>

<h1>{@html $_("about-header")}</h1>
<p>{$_("about-summary")}</p>
<h2>{$_("about-tech-stack")}</h2>
<div id="tech-stack">
    <div >
        <h3>OOP:</h3>
        <div class="lang-div">
            <img class="lang" alt="C#" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" />
            <img class="lang" alt="Java" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" />
            <img class="lang" alt="Typescript" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />
            <img class="lang" alt="Javascript" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
        </div>
    </div>
    <div>
        <h3>Webdev:</h3>
        <div class="lang-div">
            <img class="lang" alt="HTML5" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" />
            <img class="lang" alt="CSS3" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" />
            <img class="lang" alt="Sass" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" />
            <img class="lang" alt="Svelte" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg" />
        </div>
    </div>
    <!--<figure><embed src="https://wakatime.com/share/@hoellerl/bc978c61-d501-4cbc-bf7a-e77cde8eacd1.svg"></figure>-->
</div>
