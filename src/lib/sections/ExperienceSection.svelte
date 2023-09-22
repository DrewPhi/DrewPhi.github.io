<script>
    import { onDestroy, onMount } from 'svelte';
    import { lines, flying} from "../../stores";
    let mylines = ["","","",""];
    let timeout;
    lines.subscribe((value) => {
		mylines = value;
	});
    $: Scroll = mylines[0];
    $: Section = mylines[1];
    $: Next = mylines[2];
    $: Last = mylines[3];
    
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
    mylines[line] = from;
    lines.set(mylines);
    let differencesArray = [];
    if (from === to) {
      flying.set(false);
      return from.trim();
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



function load(){
    fly(Scroll, "Scroll Down to view my", 0);
    fly(Section, "Experiences", 1);
    fly(Next, "Move right to", 2);
    fly(Last, "Contact", 3);
}

    onMount(() => {
        setTimeout(() => {
        load();
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
      display: inline-block; /* or use "inline" for pure inline behavior */
      white-space: pre-wrap;

    }
    #last-word{
      font-size: 2vw;
      display: inline-block;
      margin: 0;
      font-weight: bold;
      text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
      color:       rgb(249, 251, 177);
      white-space: pre-wrap;
    }
  
  </style>
  