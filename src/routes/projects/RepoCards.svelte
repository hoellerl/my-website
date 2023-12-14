<script lang="ts">
    import {onMount} from "svelte";

    let repos: any[] = [];

    async function fetchRepos() {
        repos = await fetch('https://api.github.com/users/hoellerl/repos?per_page=9')
            .then(res => res.json())
            .then(res => res.filter((repo: any) => !repo.fork))
            .then(res => res.sort((a: any, b: any) => {
                const diff = b.stargazers_count - a.stargazers_count;
                if (diff === 0) {
                    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
                }
                return diff;
            }));
    }

    // Call the fetchRepos function when the component is mounted
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
    background-color: #312c2c;
    width: 19vw;
    min-width: 10vw;
    transition:  transform 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
    margin: 0 15px;

    h2 {
      font-size: 1.4rem;
      margin-bottom: 5px;
      color: wheat;
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
      color: #ccb690;
    }

    .bottom-row {
      display: flex;
      justify-content: space-between;
      color: wheat;
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
                <p class="desc">{repo.description}</p>
            </div>
            <div class="bottom-row">
                <p><i class="twa twa-globe-with-meridians twa-lg"><span>Language</span></i><span>{repo.language}</span></p>
                <p><i class="twa twa-star twa-lg"><span>Stars</span></i><span class="stars">{repo.stargazers_count}</span></p>
            </div>
        </a>
    {/each}
</div>
