<script>
	export let text;
</script>

<a class="cursor-pointer hover:no-underline mb-[-3px]" href={`/writing?tag=${text}`}>
	<code class="bg-[#f0f0f0] dark:bg-[#181818] font-normal rounded-md !text-[13px] sm:!text-[14px] text-[#0471d7] dark:text-[#0b9ddd] mx-1 sm:py-[0px] px-2">{text}</code>
</a>
