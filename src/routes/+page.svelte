<script lang="ts">
  import PageBreak from '$lib/components/PageBreak.svelte';
  import type { PageData } from './$types';
  import Post from '$lib/components/Post.svelte';

  export let data: PageData = { posts: [] };
</script>

<svelte:head>
  <title>Personal Website of Juho Välimäki • https://vlimki.dev</title>
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
		<p>What gets measured gets done.</p>
		<h2 class="mb-1">Reading List (as of Mar 7)</h2>
		<ul>
			<li><i>Linear Algebra</i> by Georgiy E. Shilov (currently reading)</li>
			<li><i>Calculus, Volume I</i> by Tom M. Apostol (currently reading)</li>
			<li><i>Programming Massively Parallel Procesors</i> by David B. Kirk</li>
			<li><i>Calculus, Volume II</i> by Tom M. Apostol</li>
			<li><i>Ordinary Differential Equations</i> by Vladimir I. Arnold</li>
			<li><i>Mechanics</i> by Lev D. Landau & Evgeny M. Lifshitz</li>
		</ul>
	</div>
	<h2>Log</h2>
	<div class="reading-log">
		{@html data.log.code}
	</div>
</div>
