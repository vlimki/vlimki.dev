<script lang="ts">
  import PageBreak from '$lib/components/PageBreak.svelte';
  import type { PageData } from './$types';
  import Post from '$lib/components/Post.svelte';

  export let data: PageData = { posts: [] };
</script>

<svelte:head>
  <title>Personal Website of Juho Välimäki • https://vlimki.dev</title>
  <meta name="description" content="The personal website and blog of Juho Välimäki, a software developer & aspiring machine learning engineer. Posts about ML, math and coding." />
		<meta property="og:type" content="website" />
	  <meta property="og:url" content="https://vlimki.dev/" />
  	<meta property="og:title" content="Personal Website of Juho Välimäki" />
	  <meta property="og:description" content="The personal website and blog of Juho Välimäki, an aspiring machine learning engineer. Posts about ML, math and coding." />
  	<meta property="og:image" content="https://vlimki.dev/favicon.png" />
	  <meta property="og:image:alt" content="Website logo" />

  	<!-- Twitter -->
  	<meta property="twitter:url" content="https://vlimki.dev/" />
	  <meta property="twitter:title" content="Personal Website of Juho Välimäki" />
	  <meta property="twitter:description" content="The personal website and blog of Juho Välimäki, an aspiring machine learning engineer. Posts about ML, math and coding." />
	  <meta
  	  property="twitter:image"
    	content="https://vlimki.dev/favicon.png"
	  />
  	<meta
    	property="twitter:image:alt"
	    content="Website logo"
  	/>
</svelte:head> 

<div class="flex flex-col justify-between">
  <div class="flex flex-col">
    <h1 class="font-medium mb-2">Personal Website of Juho Välimäki</h1>
    <p class="text">Hey, I'm aspiring to become a cracked machine learning engineer. I'm currently focusing on becoming extremely good at mathematics and learning Haskell. This website is mainly for me to document my ML engineering journey and it works as a means of me becoming a better writer.</p>
	<p>The <a href="/writing">writing</a> section of this website contains blog posts and articles from my daily <a href="/log">logs</a> of the things I learn in machine learning or mathematics. I've tried to compile them to a format that allows them to be used as learning resources.</p>
	<p>Don't hesitate to contact me by e-mail at <a href="mailto:root@vlimki.dev">root@vlimki.dev</a> or send me a message on X at <a href="https://x.com/vlimkidev" target="_blank" rel="noreferrer">@vlimkidev</a>. I'd be more than happy to network with like-minded individuals.</p>
    <h2 class="mt-4 mb-2">Latest Posts</h2>
	<div class="flex flex-col">
	    {#each data.posts as post}
			<Post post={post} />
    	{/each}
	</div>
  </div>
	<PageBreak />
	<h2>Experience & Technical Skills</h2>
	<p>I come from a software engineering background with roughly four years of experience. I've done freelancing and volunteering work in different areas of software — mostly related to web development, but also things like AI-based web scraping and mobile applications.</p><p>Here are some notable projects I've been involved in:</p>
	<ul class="mt-[-10px]">
		<li>Frontend Developer & Designer @ <a target="_blank" rel="noreferrer" href="https://umr.media">UMR Media</a> | 05/2024 - Today</li>
		<li>Discord Bot Lead @ <a target="_blank" rel="noreferrer" href="https://projectskilltree.com">Project Skill Tree</a> | 08/2022 - 02/2023</li>
	</ul>

	<p>Technologies I know my way around include Svelte, JS/TS, Rust, TailwindCSS, Next.js and Flutter.</p>
	<p>This website is written in Svelte. The source code for the website and blog posts is freely accessible on GitHub at <a href="https://github.com/vlimki/vlimki.dev">vlimki/vlimki.dev</a>.</p>
</div>
