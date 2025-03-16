<script>
	export let post;
	import Tag from '$lib/components/Tag.svelte';
			import { formatDate } from '$lib/utils';
</script>

<div class="mb-6">
		<a href={`/writing/${post.slug}`} class="flex flex-col hover:no-underline cursor-pointer">
	    <h3 class="text-[#252525] dark:text-[#fcfcfc]">{post.title}</h3>
  	  <p class="!my-0 !mb-1 text-[#666666] dark:text-[#999999] text-[14px] sm:text-[15px] leading-5 sm:leading-[1.4rem] md:text-sm">{post.description}</p>
		</a>
    <div class="flex flex-row items-center flex-wrap wrap">
    	<code class="text-[12px] !font-normal sm:text-[12px]">{formatDate(new Date(post.date))}</code>
      	<code class="text-[12px] sm:text-[12px] mx-2 text-[#aaaaaa]">•</code>
		{#each post.tags as tag}
			<Tag text={tag} />
  		{/each}
    </div>
</div>
