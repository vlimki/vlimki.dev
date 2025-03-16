<script>
  export let title;
  export let author;
  export let imageUrl;
  export let description;
</script>

<div class="flex flex-row items-center justify-start">
	<div class="flex flex-col items-start text-start justify-start">
		<p class="!m-0 text-start italic">{title}</p>
		<p class="pb-0 !m-0 text-xs leading-[1.2rem] text-[#666666]">{author}</p>
		<p class="!mb-1 text-sm">{description}
	</div>
</div>
