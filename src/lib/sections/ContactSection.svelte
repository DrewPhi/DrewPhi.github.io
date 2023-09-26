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
        decode(Scroll, "Send your Pigeon!", 0,3);
        decode(Section, "Contact", 1,3);
        decode(Next, "Github", 2,3);
        decode(Last, "LinkedIn", 3,3)

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
    <form action="https://formspree.io/f/xaygpggk" method="POST">
      <div class="form-group">
        <input type="text" name="name" placeholder="Name">
        <input type="email" name="email" placeholder="Email">
      </div>
      <div class="form-group">
        <textarea style = "height: 8vh;"name="message" placeholder="Message" rows="5"></textarea>
      </div>
      <div id="button-container">
        <button type="submit">Send</button>
      </div>
    </form>
    

  </div>

  </main>
  
  <style>
    
    form {
    position: fixed;
    width: 25%;
    right: 30%;
    top: 40%;
    height: 75%;
    opacity: 1; /* Initially, set opacity to 0 for the fade-in effect */
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  @keyframes fadein2 {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  input,
  textarea {
    backdrop-filter: blur(10px); /* Initially, set blur to 0 */
    animation: fadein2 1s ease-in forwards;
    font: inherit;
    font-size: 2vh;
    width: 100%;
    padding: 1vw;
    margin-bottom: 1.5vh;
    border: 1px solid rgb(249, 251, 177);
    border-radius: 4px;
    background-color: transparent;
    font-weight: bold;
    height: 3vh;
  }



  button[type="submit"] {
  background-color: rgba(249, 252, 155, 0.712);
  border: #000 5px solid 10px;
  color: black;
  backdrop-filter: blur(10px); /* Initially, set blur to 0 */
  animation: fadein2 1s ease-in forwards;
  width: 20%; /* You can adjust this value based on your design */
  height: 4vh;
  font-size: 1.75vh; /* Set the font size to scale with the page */
  display: flex;
  justify-content: center;
  align-items: center;
}

  
  button:hover[type="submit"] {
    cursor: pointer;
    border: 1px solid rgb(249, 251, 177);
  }
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
      color:        white;
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
  
  </style>
  