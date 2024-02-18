<script>
  import FooterText from './FooterText.svelte';
  export let src;
  export let text;
</script>

<div class="flex flex-col">
  <img class="max-h-[500px] object-contain mt-3 rounded-md" src={src} />
  <FooterText {text} />
</div>
