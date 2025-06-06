<script>
  export let title;
  export let description;
  export let github;
</script>

<div class="flex flex-row items-center justify-start mb-1">
	<div class="flex flex-col items-start text-start justify-start">
		<div class="flex flex-row justify-center items-center">
			<p class="m-0 text-xs md:text-sm leading-[1.2]">{title}</p>
		</div>
		<p class="pb-0 m-0 text-xs leading-[1.5] text-[#666666]">{description}</p>
		{#if github != null}
			<a href={github} target="_blank" rel="noreferrer" class="text-xxs !m-0">GitHub</a>
		{/if}
	</div>
</div>
