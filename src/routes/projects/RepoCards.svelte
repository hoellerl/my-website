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
    }


    .card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 15px;
        text-decoration: none;
        padding: 0 10px;
        background-color: #312c2c;
        width: 330px;
        transition:  all 0.2s ease-in-out;
        margin: 0 15px;

        h2 {
            font-size: 1.4rem;
            margin-bottom: 5px;
        }

        &:hover{
            transform: scale(1.05);
            box-shadow:  0 0 10px rgba(0, 0, 0, 0.5);
            color: #eed9bb;
        }

        p span{
            margin-left: 5px;
            font-size: 1.1rem;
        }

      .bottom-row {
        display: flex;
        justify-content: space-between;
      }
    }
</style>

<div class="card-container">
    {#each repos as repo}
        <a href="{repo.html_url}" class="card">
            <div>
            <h2>{repo.name}</h2>
            <p>{repo.description}</p>
            </div>
            <div class="bottom-row">
            <p><i class="twa twa-globe-with-meridians twa-lg"><span>Language</span></i><span>{repo.language}</span></p>
            <p><i class="twa twa-star twa-lg"><span>Stars</span></i><span class="stars">{repo.stargazers_count}</span></p>
            </div>
        </a>
    {/each}
</div>
