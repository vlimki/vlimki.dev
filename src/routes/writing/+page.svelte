<script lang="ts">
  import type { PageData } from './$types';
  import Tag from '$lib/components/Tag.svelte';
  import PageBreak from '$lib/components/PageBreak.svelte';
  import SelectedTag from '$lib/components/SelectedTag.svelte';
  import Post from '$lib/components/Post.svelte';

  export let data: PageData;

  let query = "";
  let titles = data.posts.map(x => x.title).slice(0, 3).join(" • ");

	const filterByTag = (data, query: string) => {
		if(data.tag === null) {
			return data.posts.filter((p: Post) => p.title.toLowerCase().includes(query.toLowerCase()))
		}

		return data.posts.filter((p: Post) => p.tags.includes(data.tag) && (p.tags.filter((t: string) => t.includes(query.toLowerCase())).length > 0 || p.title.toLowerCase().includes(query.toLowerCase())))
	}
</script>

<svelte:head>
  <title>Writing · Juho Välimäki</title> 
  <meta name="description" content={titles} />
</svelte:head> 

<div class="flex flex-col w-full items-center justify-center mb-5">
  <h1 class="text-center">Posts</h1>
</div>

<div class="flex flex-col">
{#each filterByTag(data, query) as post}
	<Post post={post} />
{/each}
</div>

<style>
	input {
		font-family: "Noto Sans Mono";
		font-size: 14px;
	}
</style>
