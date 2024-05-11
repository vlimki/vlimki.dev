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
        <a href="/"><b><code>vlimki.dev</code></b></a>
      </div>
      <div class="flex flex-row items-center">
        <a href="/"><code class={path == "/" ? "font-semibold" : ""}>Home</code></a>
      <p class="">•</p>
        <a href="/writing"><code class={path.startsWith("/writing") ? "font-semibold" : ""}>Writing</code></a>
      <p class="">•</p>
        <a href="/about"><code class={path.startsWith("/about") ? "font-semibold" : ""}>About</code></a>
      </div>
      <div class="min-w-[92px] max-w-[92px] text-[#fbfbfb] items-center hidden md:block">
      </div>
    </nav>
    <PageBreak />
    <div class="pb-2" />
    <slot />
  <PageBreak />
  <div class="flex flex-row items-center justify-center sm:justify-between">
        <div class="flex flex-row">
        <a href="https://github.com/vlimki" class="mr-5">GitHub</a>
        <a href="https://twitter.com/vlimkidev" class="mx-5">X</a>
        <a href="mailto:root@vlimki.dev" class="mx-5">Email</a>
      </div>
      <code class="text-[#aaaaaa] hidden mt-2 text-sm sm:block"><a class="font-semibold text-[#888888] footer-link" href="https://vlimki.dev">vlimki.dev</a> | Based in 🇫🇮</code>
      </div>
  </div>
</div>
