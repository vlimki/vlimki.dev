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
    <p class="text-base">Website under reconstruction.</p>
</div>
</div>
