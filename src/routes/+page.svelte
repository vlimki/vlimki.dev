<script lang="ts">
  import PageBreak from '$lib/components/PageBreak.svelte';
  import type { PageData } from './$types';
  import { formatDate } from '$lib/utils';

  export let data: PageData = { posts: [] };
</script>

<svelte:head>
  <title>Juho Välimäki's Personal Website • https://vlimki.dev</title>
  <meta name="description" content="Juho Välimäki's Blog" />
</svelte:head> 

<div class="flex flex-col justify-between">
  <div class="flex flex-col">
    <h1 class="font-medium mb-2">Personal Website of Juho Välimäki</h1>
    <p class="text">I'm a self-taught software/web engineer with roughly four years of development experience. I'm very interested in machine learning and mathematics, and that's what I am currently dedicating my time to pursuing.</p>
    <p>On the website I plan to write mostly about all things related to machine learning, mathematics and software engineering. I look forward to writing about the new things I learn and discover, hoping it'll be of use for someone else as well.</p>
    <p>Don't hesitate to send me an e-mail at <b><a href="mailto:root@vlimki.dev">root@vlimki.dev</a></b>.</p>
    <h2 class="mb-[-5px]">Latest Posts</h2>
    <ul>
    {#each data.posts as post}
      <li>
  <a href={`/writing/${post.slug}`} class="post">
    <h3>{post.title}</h3>
    <p class="text-[#666666] text-sm mt-[-5px]">{post.description}</p>
    <div class="flex flex-row items-center mt-[-15px]">
      <p><code>{formatDate(new Date(post.date))}</code></p>
      <p class="mx-2 text-[#aaaaaa]">•</p>
      {#each post.tags as tag}
        <code class="bg-[#f0f0f0] rounded-md text-sm text-[#0471d7] mx-1 px-2">{tag}</code>
      {/each}
    </div>
  </a>
      </li>
    {/each}
    </ul>
  </div>
</div>
