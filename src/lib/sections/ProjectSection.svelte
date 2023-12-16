<script>
    import { onDestroy, onMount } from 'svelte';
    import { lines } from "../../stores";
    import decode from "../../decode.js";

    let mylines = ["","","",""];
    let timeout;
    lines.subscribe((value) => {
		mylines = value;
	});
    $: Scroll = mylines[0];
    $: Section = mylines[1];
    $: Next = mylines[2];
    $: Last = mylines[3];
    
   
  


    onMount(() => {
        setTimeout(() => {
        decode(Scroll, "Move Down to view some of my", 0,1);
        decode(Section, "Projects", 1,1);
        decode(Next, "Move right to", 2,1);
        decode(Last, "Experiences", 3,1);

        }, 10);
       


    });
    onDestroy(() => clearTimeout(timeout));

    
  </script>
  
  <main >
  <div id ="title-block">
    <p id = "hi-text">{Scroll}</p>
    <p id = "name-text">{Section}</p>
    <p id = "sub-name-text">{Next}</p>
    <p id = "last-word">{Last}</p>

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
      color:       white;
      display: inline-block; /* or use "inline" for pure inline behavior */
      white-space: pre-wrap;
    }
    #last-word{
      font-size: 2vw;
      display: inline-block; /* or use "inline" for pure inline behavior */
      margin: 0;
      font-weight: bold;
      text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
      color:       rgb(249, 251, 177);
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
      #last-word{
      font-size: 5vw;
      display: inline-block; /* or use "inline" for pure inline behavior */
      margin: 0;
      font-weight: bold;
      text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
      color:       rgb(249, 251, 177);
      white-space: pre-wrap;
    }
    }
  </style>
  