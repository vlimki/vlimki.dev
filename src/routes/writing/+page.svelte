<script lang="ts">
  import type { PageData } from './$types';
  import { formatDate } from '$lib/utils';

  export let data: PageData;
  let query = "";
</script>

<svelte:head>
  <title>Writing • Juho Välimäki</title> 
  <meta name="description" content="Juho Välimäki's Blog" />
</svelte:head> 

<div class="flex flex-col w-full items-center justify-center">
  <h1 class="text-center">Posts</h1>
  <input type="text" class="code my-4 code w-2/3 h-12 rounded-2xl border border-[#ebebeb] px-5" placeholder="Search..." bind:value={query} />
</div>
{#each data.posts.filter(x => x.title.toLowerCase().includes(query.toLowerCase())) as post}
  <a href={`/writing/${post.slug}`} class="post">
    <h2>{post.title}</h2>
    <p class="text-[#666666] mt-[-10px]">{post.description}</p>
    <div class="flex flex-row items-center mt-[-20px]">
      <p><code>{formatDate(new Date(post.date))}</code></p>
      <p class="mx-2 text-[#aaaaaa]">•</p>
      {#each post.tags as tag}
        <code class="bg-[#f0f0f0] rounded-md text-sm text-[#0471d7] mx-1 px-2">{tag}</code>
      {/each}
    </div>
  </a>
{/each}
