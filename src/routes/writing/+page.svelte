<script lang="ts">
  import type { PageData } from './$types';
  import { formatDate } from '$lib/utils';
  import Tag from '$lib/components/Tag.svelte';
  import PageBreak from '$lib/components/PageBreak.svelte';
  import SelectedTag from '$lib/components/SelectedTag.svelte';
  import Post from '$lib/components/Post.svelte';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let tag = "LOADING"
  onMount(() => {
	tag = $page.url.searchParams.get('tag') || '';
  })

  export let data: PageData;

  let query = "";
  let titles = data.posts.map(x => x.title).slice(0, 3).join(" • ");

</script>

<svelte:head>
  <title>Writing • Juho Välimäki</title> 
  <meta name="description" content={titles} />
</svelte:head> 

<div class="flex flex-col w-full items-center justify-center">
  <h1 class="text-center">Posts</h1>
  <!---<div class="flex flex-row justify-center items-center flex-wrap mt-3 mb-1 w-[100%] xl:w-[60%]">
  	{#each data.tags.split(",") as t}
		{#if tag == t}
			<SelectedTag text={t} />
		{:else}
			<Tag text={t} />
		{/if} 
	{/each}
  </div>-->
  <input type="text" class="my-4 w-2/3 h-12 rounded-2xl border border-[#ebebeb] px-5" placeholder="Search by title or tag..." bind:value={query} />
</div>
<PageBreak />

{#if tag === "LOADING"}
	<h1>Loading...</h1>
{:else}
<div class="flex flex-col">
{#each data.posts.filter(x => x.title.toLowerCase().includes(query.toLowerCase()) || x.tags.filter(t => t.startsWith(query.toLowerCase())).length > 0) as post}
	<Post post={post} />
{/each}
</div>
{/if}

<style>
	input {
		font-family: "Roboto Mono";
		font-size: 14px;
	}
</style>
