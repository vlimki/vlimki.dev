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
		<p>On the road to becoming a machine learning engineer — in particular, I'm looking to specialize in computer vision and robotics later on. Currently focusing heavily on mathematics and physics. Right now this website is mainly used for personal note-taking.</p>
		<p>What gets measured gets done.</p>
		<h2 class="mb-1">Reading List (as of Sep 30)</h2>
		<ul>
			<li><i><a href="/writing/calc-vol-1">Calculus, Volume I</a></i> by Tom M. Apostol</li>
			<li><i>Linear Algebra</i> by Georgi E. Shilov</li>
		</ul>
	</div>
	<h2>Log</h2>
	<div class="reading-log">
		{@html data.log.code}
	</div>
</div>
