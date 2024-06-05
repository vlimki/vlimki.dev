<script lang="ts">
  import type { PageData } from './$types';
  import type { SvelteComponentTyped } from 'svelte/internal';
  import Tag from '$lib/components/Tag.svelte';
  import { formatDate } from '$lib/utils';

  /*import PageHead from '$lib/components/PageHead.svelte';
  import ArticleTitle from '$lib/components/ArticleTitle.svelte';
  import ArticleMeta from '$lib/components/ArticleMeta.svelte';*/

  export let data;
</script>

<svelte:head>
  <title>{data.frontmatter.title} • Juho Välimäki</title> 
  <meta name="description" content={data.frontmatter.description} />
</svelte:head> 

<!--<PageHead title={data.frontmatter.title} description={data.frontmatter.description} />
<ArticleTitle title={data.frontmatter.title} />
<ArticleMeta author={data.frontmatter.author} date={data.frontmatter.date} />-->
<h1>{data.frontmatter.title}</h1>
<div class="flex flex-row items-center mt-1 flex-wrap wrap">
  <code>{formatDate(new Date(data.frontmatter.date))}</code>
  <div class="mx-2 text-[#aaaaaa]">•</div>
  <div class="flex flex-row items-center">
	  <code>[</code>
  	{#each data.frontmatter.tags as tag}
		<Tag text={tag} />
  	{/each}
  	<code>]</code>
  </div>
  <div class="mx-2 text-[#aaaaaa]">•</div>
  <code>{data.readTime} min read</code>

</div>

<article>
	{@html data.content}
</article>

<style>
	code {
		font-size: 15px;
	}
</style>
