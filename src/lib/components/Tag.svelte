<script>
	export let text;
</script>

<a class="cursor-pointer hover:no-underline" href={`/writing?tag=${text}`}>
	<code class="bg-[#f0f0f0] dark:bg-[#101010] font-normal rounded-md !text-[13px] sm:!text-[13px] text-[#0471d7] dark:text-[#0b9ddd] mx-1 sm:py-[0px] px-2">{text}</code>
</a>
