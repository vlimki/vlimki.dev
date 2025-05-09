<script>
	export let text;
</script>

<a class="cursor-pointer hover:no-underline" href={`/writing?tag=${text}`}>
	<code class="bg-[#ffffff] border-[#ebebeb] dark:border-[#181818] border dark:bg-[#080808] font-normal rounded-md !text-[13px] sm:!text-[13px] text-[#0471d7] dark:text-[#0b9ddd] mx-1 sm:py-[0px] px-2">{text}</code>
</a>
