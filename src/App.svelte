<script>
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import Fly from './lib/Fly.svelte';
</script>

<main>


<div id ="title-block">
  <p id = "hi-text">Hi! My name is</p>
  <p id = "name-text">Drew Steindl</p>
  <p id = "sub-name-text">I'm a <Fly/></p>
</div>

 
</main>

<style>
  #title-block{
    text-align:  left;
    width:60vw;
    margin:10vh;
    animation: fadein 2s;
    
  }
  @keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}
  #hi-text{
    font-size: 2em;
    color: rgb(249, 251, 177);
    font-weight: bold;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;

    margin: 0;
  }
  #name-text{
    font-size: 5em;
    margin: 0;
    font-weight: bold;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;

  }
  #sub-name-text{
    font-size: 3em;
    margin: 0;
    font-weight: bold;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;

  }

</style>
