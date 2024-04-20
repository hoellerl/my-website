<style lang="scss">

    .card-container {
        display: flex;
        flex-wrap: wrap;
        gap: 35px;
        justify-content: space-around;
    }
</style>

<script lang="ts">
    import {onMount} from "svelte";
    import Card from "./Card.svelte";

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
    });

</script>



<div class="card-container">
    {#if repos.length === 0}
        <p>Loading...</p>
    {/if}
    {#each repos as repo}
        <Card url={repo.html_url} title={repo.name} stars={repo.stargazers_count} language={repo.language} desc={repo.description}/>
    {/each}
</div>
