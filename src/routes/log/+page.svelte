<script lang="ts">
  import type { PageData } from './$types';
  import PageBreak from '$lib/components/PageBreak.svelte';
  import { formatDate } from '$lib/utils';

  export let data: PageData;
</script>

<svelte:head>
  <title>Log • Juho Välimäki</title> 
  <meta name="description" content="" />
</svelte:head> 

<div class="flex flex-row justify-center">
  <h1>Log</h1>
</div>
<div class="flex flex-row">
  <div class="!w-[2px] !min-w-[2px] bg-[#ebebeb] ml-5" />
  <div class="flex flex-col">
	{#each data.posts as post}
	  <div class="flex flex-row items-center my-4">
		<div class="min-w-[30px] w-[30px] h-[2px] bg-[#ebebeb]"/>
		<div class="w-[6px] h-[6px] rounded-full bg-[#ebebeb] rounded-full" />
		<div class="flex flex-col ml-5">
		  <h3><b>{formatDate(new Date(post.date))}</b></h3>
		  <p class="!my-0">{post.title}</p>
		  <p class="text-[#666666] !my-0 text-sm">{post.description}</p>
		  <a href={`/writing/${post.slug}`} class="!my-0">Post link</a>
		</div>
	  </div>
	{/each}
  </div>
</div>
