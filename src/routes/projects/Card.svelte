<style lang="scss">
  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: var(--rounding);
    text-decoration: none;
    padding: 0 10px;
    background-color: var(--sec-bg);
    width: 300px;
    transition:  transform 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;

    min-width: 300px;
    max-width: 300px;
    min-height: 200px;
    max-height: 200px;


    h2 {
      font-size: 1.4rem;
      margin-bottom: 5px;
      color: var(--text);
    }

    .divider{
      height: 2px;
      background: var(--accent);
      border-radius: var(--rounding);
      margin: 0 auto 0 auto;
      transition: all 0.3s ease;
    }

    &:hover .divider{
      height: 6px;
      padding: 0 10px;
      background: linear-gradient(to right, orange 0%, var(--accent) 50%, orange 100%);
      background-size: 200% 100%;
      animation: gradient-move 3s ease infinite;

      @keyframes gradient-move {
        0% {
          background-position: 0 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0 50%;
        }
      }
    }

    &:hover{
      transform: scale(1.1);
      box-shadow:  0 0 10px rgba(0, 0, 0, 0.5);
    }

    &:active{
      transform: scale(0.95);
      box-shadow:  0 0 0 rgba(0, 0, 0, 0.5);
    }

    p span{
      margin-left: 5px;
      font-size: 1.1rem;
    }

    .desc{
      color: var(--sec-text);
    }

    .bottom-row {
      display: flex;
      justify-content: space-between;
      color: var(--text);
      p *{
        vertical-align: middle
      }
    }
  }
</style>

<script lang="ts">
    import {onMount} from "svelte";

    export let url = "";
    export let title;
    export let desc;
    export let language;
    export let stars;
    let textwidth = 0;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.font = '1.4rem "Calibri"';
        textwidth = ctx.measureText(title).width;
    }

    onMount(() => {
        setSepWidth();
        document.addEventListener('resize', setSepWidth);
    });

    function setSepWidth() {
        const divider = document.querySelector("a[href='" + url + "'] .divider") as HTMLElement;
        divider.style.width = getDividerWidth() + 'px';
    }

    function getDividerWidth() {
        let card = document.querySelector(".card");
        let cardWidth = card?.clientWidth ?? 0;
        if (cardWidth < textwidth + 50) {
            return  cardWidth- 100;
        } else {
            return textwidth + 20;
        }
    }

</script>

<a href="{url}" class="card" target="_blank">
    <div>
        <h2>{title}</h2>
        <div class="divider" style="width: 100px"></div>
        <p class="desc">{desc}</p>
    </div>
    <div class="bottom-row">
        <p><i class="twa twa-globe-with-meridians twa-lg"><span>Language</span></i><span>{language}</span></p>
        <p><i class="twa twa-star twa-lg"><span>Stars</span></i><span class="stars">{stars}</span></p>
    </div>
</a>