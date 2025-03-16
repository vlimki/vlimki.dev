<script lang="ts">
	import '../app.css';
	import PageBreak from '$lib/components/PageBreak.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let darkMode = false;

	function handleDarkMode() {
		darkMode = !darkMode
	 	localStorage.setItem('theme', darkMode ? 'dark' : 'light');

		darkMode ? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');

	}
	if (browser) {
		if(localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			document.documentElement.classList.add('dark');
			darkMode = true;
		} else {
			document.documentElement.classList.remove('dark');
			darkMode = false;
		}
	}

	let path: string;

	$: {
		path = $page.route.id || "";
	}
</script>

<div class="max-w-screen overflow-x-hidden flex flex-col items-center justify-center dark:imgbg">
	<div class="w-full md:w-2/3 xl:w-[55%] 2xl:w-[41%] h-full pb-10 px-7">
		<nav class="flex flex-row w-full items-center justify-between mt-5 text-md">
				<a href="/"><b class="md:block hidden m-0 p-0"><code class="!text-[#444444] dark:!text-[#cccccc] !text-[14px] hidden sm:block">vlimki.dev</code></b></a>
			<div class="flex flex-row items-center">
				<a href="/"><code class={path == "/" ? "font-semibold text-[#444444] dark:text-[#cccccc]" : ""}>Home</code></a>
				<p class="!my-0 text-xxs text-[#555555]">•</p>
				<a href="/reading"><code class={path.startsWith("/reading") ? "font-semibold text-[#444444] dark:text-[#cccccc]" : ""}>Reading List</code></a>
			</div>
			<div class="sm:min-w-[92px] flex sm:max-w-[92px] !my-0 pr-3 justify-end items-end">
				{#if darkMode}
					<img on:click={handleDarkMode} class="cursor-pointer h-4 w-4" src="/images/darkmode.png" />
				{:else}
					<img on:click={handleDarkMode} class="cursor-pointer h-4 w-4" src="/images/lightmode.png" />
				{/if}
			</div>
		</nav>
		<PageBreak />
			<slot />
		<PageBreak />
		<div class="flex ftr flex-row items-center justify-center sm:justify-between px-3">
		<div class="flex flex-row links text-[#0471d7] dark:text-[#0b9ddd] items-center justify-center">
				{#if darkMode}
					<a target="_blank" rel="noreferrer" href="https://github.com/vlimki" class="mr-5 !text-[16px] w-4 h-4 sm:!text-base"><img src="/images/github-light.png" /></a>
					<a href="mailto:root@vlimki.dev" class="mx-5 !text-[16px] sm:!text-base w-4 h-4 mt-[6px]"><img src="/images/email-light.png" /></a>
					<a href="https://x.com/vl1mki" rel="noreferrer" target="_blank" class="mx-5 mb-1 !text-[16px] sm:!text-base w-4 h-4 mt-[6px]"><img src="/images/x-light.png" /></a>
				{:else}
					<a target="_blank" rel="noreferrer" href="https://github.com/vlimki" class="mr-5 !text-[16px] w-4 h-4 sm:!text-base"><img src="/images/github.png" /></a>
					<a href="mailto:root@vlimki.dev" class="mx-5 !text-[16px] sm:!text-base w-4 h-4 mt-[6px]"><img src="/images/email.png" /></a>
					<a href="https://x.com/vl1mki" target="_blank" rel="noreferrer" class="mb-1 mx-5 !text-[16px] sm:!text-base w-4 h-4 mt-[6px]"><img src="/images/x.png" /></a>
				{/if}
		</div>
		<code class="text-[13px] text-[#aaaaaa] hidden mt-2 sm:block"><a class="font-semibold text-[#888888] footer-link" href="/">vlimki.dev</a> | Based in 🇫🇮</code>
		</div>
	</div>
</div>

<style lang="postcss">
	.links a {
		font-size: 10px;
	}

	.links a {
		font-weight: 500;
	}

	.links a:hover {
		text-decoration: underline;
		cursor: pointer;
	}
</style>
