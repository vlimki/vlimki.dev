<script>
	import PageBreak from '$lib/components/PageBreak.svelte';
</script>

<svelte:head>
	<title>About - Juho Välimäki</title>
	<meta name="description" content="I'm an aspiring and ambition-driven machine learning engineer." />
</svelte:head> 

<div class="flex flex-row ">
	<img class="hidden sm:block shadow-lg sm:max-h-[150px] md:max-h-[170px] lg:max-h-[200px] rounded-full aspect-square object-cover" alt="image of Juho" src="/images/pfp.png" />
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
	p:not(ul p) {
		margin-top: 12px;
		margin-bottom: 12px;
	}
	img {
	}
</style>
