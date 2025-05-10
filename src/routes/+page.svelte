<script lang="ts">
  import PageBreak from '$lib/components/PageBreak.svelte';
  import type { PageData } from './$types';
  import Post from '$lib/components/Post.svelte';
  import Project from '$lib/components/Project.svelte';

  export let data: PageData = { posts: [] };
</script>

<svelte:head>
  <title>Personal Website of Juho Välimäki</title>
  <meta name="description" content="The personal website and blog of Juho Välimäki. Posts about engineering and mathematics." />
		<meta property="og:type" content="website" />
	  <meta property="og:url" content="https://vlimki.dev/" />
  	<meta property="og:title" content="Personal Website of Juho Välimäki" />
	  <meta property="og:description" content="The personal website and blog of Juho Välimäki. Posts about machine learning, engineering and mathematics." />
  	<meta property="og:image" content="https://vlimki.dev/favicon.png" />
	  <meta property="og:image:alt" content="Website logo" />

  	<!-- Twitter -->
  	<meta property="twitter:url" content="https://vlimki.dev/" />
	  <meta property="twitter:title" content="Personal Website of Juho Välimäki" />
	  <meta property="twitter:description" content="The personal website and blog of Juho Välimäki, an aspiring engineer. Posts about ML, math and GPU engineering." />
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
		<p>GPU engineering and machine learning.</p>
		<p>I'm currently focusing heavily on mathematics and physics. Right now this website is mainly used for personal note-taking, but I will be updating it soon.</p>
		<p>Feel free to reach out <a href="mailto:root@vlimki.dev">by email</a>. <br/> Also, check out my <a href="/reading">reading list</a>.</p>
		<h2 class="mb-3">Recent Posts</h2>
		{#each data.posts.slice(0, 2) as post}
			<Post post={post} />
		{/each}
		<div class="mb-[-20px]" />
		<h2 class="mb-3">Projects</h2>
		<ul class="grid sm:grid-cols-2">
			<li>
				<Project title="tensoron - CUDA-Accelerated Linear Algebra in Rust" description="A CUDA-accelerated linear algebra library for Rust. Planning to use it to build an MNIST classifier eventually." github="https://github.com/vlimki/tensoron" />
			</li>
			<li>
				<Project title="hdax - Haskell Data Analysis eXtension" description="A simple data analysis library for tabular data in Haskell." github="https://github.com/vlimki/hdax" />
			</li>
			<li>
				<Project title="vlimki.dev - My Personal Website" description="The website you're looking at. Built with Svelte and TailwindCSS." github="https://github.com/vlimki/vlimki.dev" />
			</li>
			<li>
				<Project title="Building And Optimizing an MNIST Classifier With CUDA" description="My next project. Coming later." />
			</li>
		</ul>
	</div>
</div>
