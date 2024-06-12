<script lang="ts">
  import '../app.css';
  import PageBreak from '$lib/components/PageBreak.svelte';
  import { page } from '$app/stores';

  let path: string;

  $: {
    path = $page.route.id || "";
  }
</script>


<div class="max-w-screen overflow-hidden flex flex-col items-center justify-center">
  <div class="w-full md:w-2/3 xl:w-[55%] 2xl:w-[41%] h-full px-7 pb-10">
    <nav class="flex flex-row w-full items-center justify-center md:justify-between mt-5 code text-md">
      <div class="hidden md:block items-center">
        <a href="/"><b><code class="!text-[#444444] text-sm">vlimki.dev</code></b></a>
      </div>
      <div class="flex flex-row items-center">
        <a href="/"><code class={path == "/" ? "font-semibold text-[#444444]" : ""}>Home</code></a>
	    <p class="!my-0 text-xs text-[#555555]">•</p>
        <a href="/writing"><code class={path.startsWith("/writing") ? "font-semibold text-[#444444]" : ""}>Writing</code></a>
      	<p class="!my-0 text-xs text-[#555555]">•</p>
        <a href="/about"><code class={path.startsWith("/about") ? "font-semibold text-[#444444]" : ""}>About</code></a>
      </div>
      <div class="min-w-[92px] max-w-[92px] text-[#fbfbfb] items-center hidden md:block">
      </div>
    </nav>
    <PageBreak width="80%" />
    <div class="pb-2" />
    <slot />
  	<PageBreak />
  	<div class="flex ftr flex-row items-center justify-center sm:justify-between">
		<div class="flex flex-row links">
	        <a target="_blank" rel="noreferrer" href="https://github.com/vlimki" class="mr-5 !text-[16px] sm:!text-base">GitHub</a>
    	    <a target="_blank" rel="noreferrer" href="https://twitter.com/vlimkidev" class="mx-5 !text-[16px] sm:!text-base">X</a>
        	<a href="mailto:root@vlimki.dev" class="mx-5 !text-[16px] sm:!text-base">Email</a>
      </div>
      <code class="footercode text-xxs text-[#aaaaaa] hidden mt-2 sm:block"><a class="font-semibold text-[#888888] footer-link" href="https://vlimki.dev">vlimki.dev</a> | Based in 🇫🇮</code>
      </div>
  </div>
</div>

<style>
	nav a {
		margin-right: 20px;
		margin-left: 20px;
		color: #666666 !important;
	}

	nav a:hover {
		cursor: pointer;
		text-decoration: underline;
	}

	.links a {
		font-size: 19px;
	}

	.links a {
		color: #0471d7;
		font-weight: 500;
	}

	.links a:hover {
		text-decoration: underline;
		cursor: pointer;
	}
</style>
