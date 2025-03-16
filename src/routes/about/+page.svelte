<script lang="ts">
	import PageBreak from '$lib/components/PageBreak.svelte';
</script>

<svelte:head>
	<title>About - Juho Välimäki</title>
	<meta name="description" content="I'm an aspiring and ambition-driven machine learning engineer." />
</svelte:head> 

<div class="flex flex-row ">
	<div class="mr-5">
		<img class="aspect-square rounded-full object-cover" alt="image of Juho" src="/images/pfp.png" />
	</div>
	<div class="sm:ml-10">
		<h1 class="">About</h1>
		<p>Hey - I'm Juho Välimäki, and I aspire to be a machine learning engineer. At first I got into ML because I saw it as the only sensible route for the future (due to product advancements like ChatGPT), but soon enough it completely replaced my interest for web/software engineering.</p>
		<p class="!my-0" >My interests include:</p>
		<ul>
			<li>machine learning + mathematics</li>
			<li>self-improvement</li>
			<li>kickboxing + weightlifting</li>
			<li>playing the guitar + music production.</li>
		</ul>

		<p>For anyone interested in connecting - don't hesitate to send me an email at <a href="mailto:root@vlimki.dev">root@vlimki.dev</a>.</p>
	</div>
</div>
<style>
	img {

		border-radius: 1000px;
    	aspect-ratio: 1;
    	object-fit: cover;
	}
</style>
