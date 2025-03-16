<script>
  export let title;
  export let author;
  export let imageUrl;
  export let description;
  export let notes;
</script>

<div class="flex flex-row items-center justify-start">
	<div class="flex flex-col items-start text-start justify-start">
		<div class="flex flex-row justify-center items-center">
			<p class="!m-0 leading-[1.2] italic">{title}</p>
			{#if notes != null}
				<p class="!m-0 !ml-1">(<a href={notes}>notes</a>)</p>
			{/if}
		</div>
		<p class="pb-0 !m-0 text-xs leading-[1.2rem] text-[#666666]">{author}</p>
		<p class="!mb-1 text-sm">{description}
	</div>
</div>
