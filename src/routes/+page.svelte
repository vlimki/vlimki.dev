<script lang="ts">
  import PageBreak from '$lib/components/PageBreak.svelte';
  import type { PageData } from './$types';
  import Post from '$lib/components/Post.svelte';

  export let data: PageData = { posts: [] };
</script>

<svelte:head>
  <title>Personal Website of Juho Välimäki • https://vlimki.dev</title>
  <meta name="description" content="The personal website and blog of Juho Välimäki, a software developer & aspiring machine learning engineer. Posts about ML, math and coding." />
</svelte:head> 

<div class="flex flex-col justify-between">
  <div class="flex flex-col">
    <h1 class="font-medium mb-2">Personal Website of Juho Välimäki</h1>
    <p class="text">Hey, I'm aspiring to become a "cracked" machine learning engineer. Previously a software/web engineer with 4+ years of experience. This website is mainly for me to document my ML engineering journey and become a better writer.</p>
	<p>The <a href="/writing">writing</a> section of this website contains my daily logs of the things I learn in machine learning or mathematics, often in the form of a resource that can be freely used for learning.</p>
	<p>Don't hesitate to contact me by e-mail at <a href="mailto:root@vlimki.dev">root@vlimki.dev</a> or on X at <a href="https://x.com/vlimkidev" target="_blank" rel="noreferrer">@vlimkidev</a>. I'd be more than happy to network with like-minded individuals.</p>

    <h2 class="mt-4 mb-2">Latest Posts</h2>
	<div class="flex flex-col">
	    {#each data.posts as post}
			<Post post={post} />
    	{/each}
	</div>
  </div>
</div>

<style>
	p a {
		color: #0471d7;
	}

	p a:hover {
		text-decoration: underline;
		cursor: pointer;
	}
</style>
