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
        --text-size-huge: 6rem;
        --text-size-large: 3.5rem;
        --text-size-medium: 2.5rem;
        --text-size: 2rem;
        --text-size-small: 1.2rem;
        --text-size-tiny: 0.9rem;
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





    nav {
        flex: 0 1 auto;
        --side-spacing: 30px;
        display: flex;
        margin: -7px 0 var(--side-spacing);
        padding: 20px 50px;
        background: #2c2e31;
        justify-content: space-between;
        font-size: var(--text-size-small);

        div{
            flex-shrink: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        h1{
            font-size: var(--text-size);
        }

        button, .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            background: none;
            border: none;
            flex-shrink: 0;
        }
        button{
            width: 50px;
            margin-left: var(--side-spacing);
            font-size: var(--text-size);
        }
        .logo{
            margin-right: var(--side-spacing);
            img{
                height: 70px;
            }
        }
    }

    footer {
        flex: 0 1 30px;
        font-size: var(--text-size-tiny);

        a {
            display: inline-block;
        }
    }

    :global(a){
        color: var(--text);
        text-decoration: underline;
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
    @media only screen and (min-width: 1024px) {
        // padding for desktop
        #content{
            padding: 0 15vw;
        }
    }

    :global(body) {
        margin: 0; // reset default margin
        display: flex;
        flex-flow: column;
        min-height: 100vh;
        #content{
            flex: 1 1 auto;
        }
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
        font-size: var(--text-size-large);
    }

    #selector{
        z-index: 1;
        width: 20px;
        height: 5px;
        background: var(--accent);
        border-radius: 10px;
        transition: all 0.3s ease;
        opacity: 0;
        position: absolute;
        bottom: 20px;
        left: 0;
    }
    .nav-buttons {

        position: relative;
        a{
            z-index: 2;
            padding: 25px;
            transition: 0.6s ease;
            text-transform: uppercase;
            text-decoration: none;
            margin: 5px;
            &:active ~ #selector{
                transform: scale(0.5);
            }
        }
    }
</style>

<script lang="ts">
    import { locale, _} from 'svelte-i18n';
    import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';
    import {onMount} from "svelte";
    import {page} from "$app/stores";
    import lang from "$lib/stores/langStore";
    import {get} from "svelte/store";
    const localLang = get(lang);
    if (localLang !== "") {
        locale.set(localLang);
    }

    const footerSep = "&nbsp;&nbsp;•&nbsp;&nbsp;";
    const deCountries = ["germany", "austria", "switzerland", "liechtenstein"];
    const enCountries = ["united-kingdom", "australia", "united-states", "canada"];
    let englishLocation: number = 0;
    let germanLocation : number = 0;

    inject({ mode: dev ? 'development' : 'production' });
    injectSpeedInsights();
    changeFlagBasedOnLocation();

    onMount(() => {
        // 100 ms timeout since chrome messes up the hover effect without it
        setTimeout(() => {
            buttonHoverSetup();
        }, 100);
        // when the window is resized, recalculate the positions of the selector
        window.addEventListener('resize', () => {
            buttonHoverSetup();
        });


    });

    function changeFlagBasedOnLocation(){
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const userLocationArr: string[] = timezone.split("/");
        const userLocation: string = userLocationArr[0] === "Europe" ? userLocationArr[1] : userLocationArr[0]; // get country/capital name
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
    }
    function changeLocale(){
        if (($locale as string).startsWith('en')) {
            locale.set('de');
            lang.set('de');
        } else {
            locale.set('en');
            lang.set('en');
        }
        // short delay to account for the time it takes to change the locale
        setTimeout(() => {
            buttonHoverSetup();
        }, 100);
    }
    function buttonHoverSetup(){
        // get button which leads to current route
        let activeButton =  document.querySelector(`.nav-buttons a[href="${window.location.pathname}"]`);
        let isHovering = false;
        const navButtons = document.querySelectorAll('.nav-buttons a');
        const parentDiv = document.querySelector('.nav-buttons');
        const selector = document.querySelector('#selector') as HTMLElement;
        if (!selector || !parentDiv || !navButtons){
            return;
        }
        // make selector only visible once the logic is working
        const parentRect = parentDiv.getBoundingClientRect();
        const selectorWidth = selector.offsetWidth;
        // when page changes, move selector to new button
        page.subscribe(() => {
            activeButton =  document.querySelector(`.nav-buttons a[href="${window.location.pathname}"]`);
            if (activeButton){
                moveButton(activeButton);
            }
        });
        if (activeButton){
            // initial move
            moveButton(activeButton);
        }


        navButtons.forEach((button) => {
            button.addEventListener('mouseover', () => {
                moveButton(button);
                isHovering = true;
            });

            button.addEventListener('mouseout', () => {
                isHovering = false;
                // let the selector "stick" for a short amount of time
                setTimeout(() => {
                    // if the mouse is not hovering over any button, move the selector back to the active button
                    if (activeButton && !isHovering && button !== activeButton) {
                        moveButton(activeButton);
                    }
                }, 1000);

            });
        });
        function moveButton(bt: Element){
            if (selector.style.opacity !== '1'){
                selector.style.opacity = '1';
            }
            const rect = bt.getBoundingClientRect();
            // calculate the distance from the left side of the parent div to the center of the button
            const distance = (rect.left + rect.width / 2) - parentRect.left - selectorWidth / 2;
            // move selector to button
            selector.style.left = `${distance}px`;
        }
    }
</script>
<nav>
    <div>
    <a class="logo" href="/"><img src="/favicon.svg" alt="logo"></a>
        <h1>Adam Höllerl</h1>
    </div>
    <div>
    <div class="nav-buttons">

        <a href="/">{$_("home")}</a>
        <a href="/about">{$_("about")}</a>
        <a href="/contact">{$_("contact")}</a>
        <a href="/projects">{$_("projects")}</a>
        <div id="selector"></div>

    </div>
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