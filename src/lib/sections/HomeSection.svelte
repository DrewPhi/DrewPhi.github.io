<script>
    import { onDestroy, onMount } from 'svelte';
    import Fly from '../Fly.svelte';
    import { lines } from "../../stores";
    import decode from "../../decode.js";
    let mylines = ["","","",""];
    lines.subscribe((value) => {mylines = value;});
    let timeout;
    $: HiText = mylines[0];
    $: Name = mylines[1];
    $: Im = mylines[2];
    
    
    

    onMount(() => {

    setTimeout(() => {

        decode(HiText, "Hi! My name is", 0,0);
        decode(Name, "Drew Steindl", 1,0);
        decode(Im, "I'm a ", 2,0);

        
    });
});
onDestroy(() => clearTimeout(timeout));

  </script>
  
  <main >
  <div id ="title-block">
    <p id = "hi-text">{HiText}</p>
    <p id = "name-text">{Name}</p>
    <p id = "sub-name-text">{Im}<Fly/></p>
  </div>
  
  </main>
  
  <style>
    #title-block{
      text-align:  left;
      width:60vw;
      margin: 5vh 10vh 0; /* Adjust top margin to move it upwards */
    }
    @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
    #hi-text{
      font-size: 2vw;
      color: rgb(249, 251, 177);
      font-weight: bold;
      text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
      white-space: pre-wrap;
      margin: 0;

    }
    #name-text{
      font-size: 5vw;
      margin: 0;
      font-weight: bold;
      text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
      color: white;
      white-space: pre-wrap;

    }
    #sub-name-text{
      font-size: 2vw;
      margin: 0;
      font-weight: bold;
      text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
      color: white;
      white-space: pre-wrap;

    }
    @media only screen and (max-width: 768px) {
      #title-block{
        text-align:  left;
        width:80vw;
        margin: 0vh 3vh 0; /* Adjust top margin to move it upwards */
      }
      @keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
      #hi-text{
        font-size: 4vw;
        color: rgb(249, 251, 177);
        font-weight: bold;
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
        white-space: pre-wrap;
        margin: 0;

      }
      #name-text{
        font-size: 10vw;
        margin: 0;
        font-weight: bold;
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
        color: white;
        white-space: pre-wrap;

      }
      #sub-name-text{
        font-size: 5vw;
        margin: 0;
        font-weight: bold;
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
        color: white;
        white-space: pre-wrap;

      }
    }
  </style>
  