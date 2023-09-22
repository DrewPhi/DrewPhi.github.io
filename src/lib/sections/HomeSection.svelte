<script>
    import { onDestroy, onMount } from 'svelte';
    import Fly from '../Fly.svelte';
    import { lines,flying } from "../../stores";
    let mylines = ["","","",""];
    let timeout;
    lines.subscribe((value) => {
		mylines = value;
	});
    $: HiText = mylines[0];
    $: Name = mylines[1];
    $: Im = mylines[2];
    
    
    function fly(from, to,line) {
    flying.set(true);
    if (from.length !== to.length) {
        if (from.length > to.length) {
            to += " ".repeat(from.length - to.length);
        }
        else {
            from += " ".repeat(to.length - from.length);
        }
    }
    mylines[line] = (from.trim() + " ");
    lines.set(mylines);
    let differencesArray = [];
    if (from === to) {
      flying.set(false);
      return from;
    }
    else if (from.search("■") === -1) {
      for (let i = 0; i < from.length ; i++){
          if (from[i] !== to[i]){
              differencesArray.push(i);                
          }
      }
      
      let chosenIndex = differencesArray[Math.floor(Math.random()*differencesArray.length)];
      timeout = setTimeout(fly, 40, from.substring(0, chosenIndex) + '■' + (chosenIndex == from.length - 1 ? '' : from.substring(chosenIndex + 1)), to,line);
    }
    else{
      timeout = setTimeout(fly, 40,from.replace("■", to[from.search("■")]), to,line);
    }
    
  }


    onMount(() => {

    setTimeout(() => {
        fly(HiText, "Hi! My name is", 0);
        fly(Name, "Drew Steindl", 1);
        fly(Im, "I'm a ", 2);
        
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
      margin:10vh;
      
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
  
  </style>
  