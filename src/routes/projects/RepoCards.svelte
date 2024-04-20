<style lang="scss">

    .card-container {
        display: flex;
        flex-wrap: wrap;
        gap: 35px;
        justify-content: space-around;
    }


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
        }
    }

    .bottom-row p * {
        vertical-align: middle;
    }
</style>

<script lang="ts">
    import {onMount} from "svelte";

    interface Repo {
        updated_at: number;
        html_url:string,
        name:string,
        stargazers_count:number,
        language:string,
        description:string,
        fork:boolean,
        textwidth:number
    }
    let repos: Repo[] = [];

    async function fetchRepos() {
        repos = await fetch('https://api.github.com/users/hoellerl/repos?per_page=100')
            .then(res => res.json())
            .then(res => res.filter((repo: Repo) => !repo.fork))
                .then(res => res.map((repo: Repo) => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.font = '1.4rem "Calibri"';
                    repo.textwidth = ctx.measureText(repo.name).width;
                }
                return repo;
            }))
            .then(res => res.sort((a: Repo, b: Repo) => {
                const diff = b.stargazers_count - a.stargazers_count;
                if (diff === 0) {
                    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
                }
                return diff;
            }));
    }
    onMount(() => {
        fetchRepos();
        setTimeout(() => {
            setSepWidth();
        }, 500);
        window.addEventListener('resize', setSepWidth);
    });

    function setSepWidth(){
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            const divider = card.querySelector('.divider') as HTMLElement;
            divider.style.width = getDividerWidth(repos[index]) + 'px';
        });
    }
    function getDividerWidth(repo:Repo) {
        let card = document.querySelector('.card');
        let cardWidth = card?.clientWidth ?? 0;
        if (cardWidth < repo.textwidth + 50) {
            return  cardWidth- 100;
        } else {
            return repo.textwidth + 20;
        }
    }
</script>



<div class="card-container">
    {#if repos.length === 0}
        <p>Loading...</p>
    {/if}
    {#each repos as repo}
        <a href="{repo.html_url}" class="card" target="_blank">
            <div>
                <h2>{repo.name}</h2>
                <div class="divider" style="width: {getDividerWidth(repo)}"></div>
                <p class="desc">{repo.description??""}</p>
            </div>
            <div class="bottom-row">
                <p><i class="twa twa-globe-with-meridians twa-lg"><span>Language</span></i><span>{repo.language}</span></p>
                <p><i class="twa twa-star twa-lg"><span>Stars</span></i><span class="stars">{repo.stargazers_count}</span></p>
            </div>
        </a>
    {/each}
</div>
