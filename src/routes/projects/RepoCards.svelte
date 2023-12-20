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
    }
    let repos: Repo[] = [];

    async function fetchRepos() {
        repos = await fetch('https://api.github.com/users/hoellerl/repos?per_page=9')
            .then(res => res.json())
            .then(res => res.filter((repo: Repo) => !repo.fork))
            .then(res => res.sort((a: Repo, b: Repo) => {
                const diff = b.stargazers_count - a.stargazers_count;
                if (diff === 0) {
                    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
                }
                return diff;
            }));
    }
    onMount(fetchRepos);
</script>

<style lang="scss">

  .card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
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
    width: 19vw;
    min-width: 10vw;
    transition:  transform 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
    margin: 0 15px;

    h2 {
      font-size: 1.4rem;
      padding-bottom: 5px;
      margin-bottom: 5px;
      color: var(--text);
    }

    .divider{
        width: calc(100% + 20px);
        height: 2px;
background: linear-gradient(to right, var(--sec-bg) 10%, var(--accent) 50%, var(--sec-bg) 90%);
      margin: 7px -10px;
    }

    &:hover{
      transform: scale(1.05);
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

<div class="card-container">
    {#if repos.length === 0}
        <p>Loading...</p>
    {/if}
    {#each repos as repo}
        <a href="{repo.html_url}" class="card" target="_blank">
            <div>
                <h2>{repo.name}</h2>
                <div class="divider"></div>
                <p class="desc">{repo.description??""}</p>
            </div>
            <div class="bottom-row">
                <p><i class="twa twa-globe-with-meridians twa-lg"><span>Language</span></i><span>{repo.language}</span></p>
                <p><i class="twa twa-star twa-lg"><span>Stars</span></i><span class="stars">{repo.stargazers_count}</span></p>
            </div>
        </a>
    {/each}
</div>
