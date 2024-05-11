<script lang="ts">
  import type { PageData } from './$types';
  import type { SvelteComponentTyped } from 'svelte/internal';
  import { formatDate } from '$lib/utils';

  /*import PageHead from '$lib/components/PageHead.svelte';
  import ArticleTitle from '$lib/components/ArticleTitle.svelte';
  import ArticleMeta from '$lib/components/ArticleMeta.svelte';*/

  export let data: PageData;

  type C = $$Generic<typeof SvelteComponentTyped<any, any, any>>;
  $: component = data.component as unknown as C;
</script>

<svelte:head>
  <title>{data.frontmatter.title} • Juho Välimäki</title> 
  <meta name="description" content={data.frontmatter.description} />
</svelte:head> 

<!--<PageHead title={data.frontmatter.title} description={data.frontmatter.description} />
<ArticleTitle title={data.frontmatter.title} />
<ArticleMeta author={data.frontmatter.author} date={data.frontmatter.date} />-->
<h1>{data.frontmatter.title}</h1>
<div class="flex flex-row items-center mb-3">
  <code>{formatDate(new Date(data.frontmatter.date))}</code>
  <div class="mx-2 text-[#aaaaaa]">•</div>
  <!--<code>[</code>-->
  {#each data.frontmatter.tags as tag}
    <code class="bg-[#f0f0f0] rounded-md text-sm text-[#0471d7] mx-1 px-2">{tag}</code>
  {/each}
  <!--<code>]</code>-->


</div>

<svelte:component this={component} />
