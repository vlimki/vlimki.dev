<script lang="ts">
	import '../app.css';
	import PageBreak from '$lib/components/PageBreak.svelte';
	import { page } from '$app/stores';
	import * as ackeeTracker from 'ackee-tracker';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	const ackeeServer = import.meta.env.VITE_ACKEE_SERVER;
	const ackeeDomainId = import.meta.env.VITE_ACKEE_DOMAIN_ID;

	onMount(() => {
		const instance = ackeeTracker.create(ackeeServer, {
			detailed: true
		});

		instance.record(ackeeDomainId);
	});

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

<div class="max-w-screen overflow-x-hidden flex flex-col items-center justify-center">
	<div class="w-full md:w-2/3 xl:w-[55%] 2xl:w-[41%] h-full px-7 pb-10">
		<nav class="flex flex-row w-full items-center justify-between mt-5 code text-md">
			<div class="items-center">
				<a href="/"><b><code class="!text-[#444444] dark:!text-[#cccccc] text-sm">vlimki.dev</code></b></a>
			</div>
			<div class="flex flex-row items-center">
				<!--<a href="/"><code class={path == "/" ? "font-semibold text-[#444444] dark:text-[#cccccc]" : ""}>Home</code></a>
				<p class="!my-0 text-xxs text-[#555555]">•</p>
				<a href="/about"><code class={path.startsWith("/about") ? "font-semibold text-[#444444] dark:text-[#cccccc]" : ""}>About</code></a>
				<a href="/writing"><code class={path.startsWith("/writing") ? "font-semibold text-[#444444] dark:text-[#cccccc]" : ""}>Writing</code></a>
				<p class="!my-0 text-xxs text-[#555555]">•</p>
				<a href="/library"><code class={path.startsWith("/library") ? "font-semibold text-[#444444] dark:text-[#cccccc]" : ""}>Library</code></a>
				<p class="!my-0 text-xxs text-[#555555]">•</p>
				<a href="/log"><code class={path.startsWith("/log") ? "font-semibold text-[#444444] dark:text-[#cccccc]" : ""}>Log</code></a>
				<p class="!my-0 text-xs text-[#555555]">•</p>
				<a href="/about"><code class={path.startsWith("/about") ? "font-semibold text-[#444444] dark:text-[#cccccc]" : ""}>About</code></a>-->
			</div>
			<div class="sm:min-w-[92px] flex sm:max-w-[92px] !my-0 pr-3 justify-end items-end">
				{#if darkMode}
					<img on:click={handleDarkMode} class="cursor-pointer h-5 w-5" src="/images/darkmode.png" />
				{:else}
					<img on:click={handleDarkMode} class="cursor-pointer h-5 w-5" src="/images/lightmode.png" />
				{/if}
			</div>
		</nav>
		<PageBreak />
			<slot />
		<PageBreak />
		<div class="flex ftr flex-row items-center justify-center sm:justify-between">
		<div class="flex flex-row links text-[#0471d7] dark:text-[#0b9ddd] items-center justify-center">
				{#if darkMode}
					<a target="_blank" rel="noreferrer" href="https://github.com/vlimki" class="mr-5 !text-[16px] w-5 h-5 sm:!text-base"><img src="/images/github-light.png" /></a>
					<a target="_blank" rel="noreferrer" href="https://twitter.com/vl1mki" class="mx-5 !text-[16px] w-5 h-5 sm:!text-base"><img src="/images/x-light.png"/></a>
					<a href="mailto:root@vlimki.dev" class="mx-5 !text-[16px] sm:!text-base w-5 h-5 mt-[6px]"><img src="/images/email-light.png" /></a>
				{:else}
					<a target="_blank" rel="noreferrer" href="https://github.com/vlimki" class="mr-5 !text-[16px] w-5 h-5 sm:!text-base"><img src="/images/github.png" /></a>
					<a target="_blank" rel="noreferrer" href="https://twitter.com/vl1mki" class="mx-5 !text-[16px] w-5 h-5 sm:!text-base"><img src="/images/x.png"/></a>
					<a href="mailto:root@vlimki.dev" class="mx-5 !text-[16px] sm:!text-base w-5 h-5 mt-[6px]"><img src="/images/email.png" /></a>
				{/if}
		</div>
		<code class="text-xxs text-[#aaaaaa] hidden mt-2 sm:block"><a class="font-semibold text-[#888888] footer-link" href="/">vlimki.dev</a> | Based in 🇫🇮</code>
		</div>
	</div>
</div>

<style lang="postcss">
	.links a {
		font-size: 14px;
	}

	.links a {
		font-weight: 500;
	}

	.links a:hover {
		text-decoration: underline;
		cursor: pointer;
	}
</style>
