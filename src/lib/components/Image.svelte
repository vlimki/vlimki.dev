<script>
  import FooterText from './FooterText.svelte';
  import { Modal, Content, Trigger } from "sv-popup"
  
  export let src;
  export let text;
</script>

<Modal button={false}>
  <Content class="overflow-hidden">
      <div class="flex flex-col">
        <img class="img2 mt-20" src={src} />
        <p class="bg-white rounded-xl p-2 px-5 code" >{text}</p>
      </div>
  </Content>
  <div class="flex flex-col items-center">
  <Trigger>
      <img class="img mt-3" src={src} />
  </Trigger>
  <FooterText {text} />
  </div>
</Modal>

<style>
	.img2 {
  		width: auto;
		height: auto;
		max-width: 80vw;
  		max-height: 80vh;
  		object-fit: contain;
  		border-radius: 10px;
  		border: 1px solid #ebebeb;
  		background: #ffffff;
  		top: 100%;
  		left: 100%;
	}

	.img {
  		width: auto;
  		height: auto;
  		max-width: 100%;
  		max-height: 500px;
  		object-fit: contain;
  		border-radius: 10px;
  		top: 100%;
		left: 100%;
  		border: 1px solid #ebebeb;
	}
</style>
