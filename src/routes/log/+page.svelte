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

<div class="flex flex-row">
  <div class="!w-[2px] !min-w-[2px] bg-[#ebebeb] dark:bg-[#333333] ml-5 rounded-full" />
	<div class="flex flex-row items-center">
		<article class="ml-5 mb-5">
			{@html data.tasks.code}
		</article>
	</div>
</div>
<div class="flex flex-row">
  <div class="!w-[2px] !min-w-[2px] bg-[#ebebeb] dark:bg-[#333333] ml-5 rounded-full" />
  <div class="flex flex-col">
	{#each data.posts as post}
	  <div class="flex flex-row items-center my-4">
		<div class="min-w-[30px] w-[30px] h-[2px] bg-[#ebebeb] dark:bg-[#333333]"/>
		<div class="w-[6px] h-[6px] rounded-full bg-[#ebebeb] dark:bg-[#333333] rounded-full" />
		<div class="flex flex-col ml-5">
		  <h3><b>{formatDate(new Date(post.date))}</b></h3>
		  <p class="!my-0">{post.title}</p>
		  <p class="text-[#666666] dark:text-[#999999] leading-[1.4rem] !my-0 text-sm">{post.description}</p>
		  <a href={`/writing/${post.slug}`} class="!my-0">Notes</a>
		</div>
	  </div>
	{/each}
  </div>
</div>
