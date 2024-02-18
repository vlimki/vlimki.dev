<script lang="ts">
  import type { PageData } from './$types';
  import { formatDate } from '$lib/utils';

  export let data: PageData;
</script>

<h1 class="text-center">Posts</h1>
{#each data.posts as post}
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
