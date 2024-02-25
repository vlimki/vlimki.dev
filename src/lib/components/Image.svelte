<script>
  import FooterText from './FooterText.svelte';
  import { Modal, Content, Trigger } from "sv-popup"
  
  export let src;
  export let text;
</script>

<Modal button={false}>
  <Content>
      <img class="rounded-xl" src={src} />
      <p class="bg-white rounded-xl p-2 px-5 code" >{text}</p>
  </Content>
  <div class="flex flex-col items-center">
  <Trigger>
      <img class="img mt-3" src={src} />
  </Trigger>
  <FooterText {text} />
  </div>
</Modal>

