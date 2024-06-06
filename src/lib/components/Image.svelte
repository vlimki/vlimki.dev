<script>
  import FooterText from './FooterText.svelte';

  export let src;
  export let text;
</script>

<div class="flex flex-col items-center">
  <img alt={text} src={src} />
  <FooterText {text} />
</div>
