<script>
	export let post;
	import Tag from '$lib/components/Tag.svelte';
  	import { formatDate } from '$lib/utils';
</script>

<a href={`/writing/${post.slug}`} class="mb-5">
    <h3 class="text-[#252525]">{post.title}</h3>
    <p class="!my-0 text-[#666666] text-[17px]">{post.description}</p>
    <div class="flex flex-row items-center">
    	<code class="text-[15px]">{formatDate(new Date(post.date))}</code>
      	<code class="text-[15px] mx-2 text-[#aaaaaa]">•</code>
		{#each post.tags as tag}
			<Tag text={tag} />
  		{/each}
    </div>
</a>

<style>
	a:hover {
		text-decoration: none !important;
	}
</style>
