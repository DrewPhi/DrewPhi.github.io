<script>
  import HomeSection from './lib/sections/HomeSection.svelte';
  import ProjectSection from './lib/sections/ProjectSection.svelte';
  import ExperienceSection from './lib/sections/ExperienceSection.svelte';
  import ContactSection from './lib/sections/ContactSection.svelte';
  import {page } from './stores.js';
  import KnotUrsi from './lib/sections/KnotUrsi.svelte';
  import Harper from './lib/sections/Harper.svelte';
  import { fly } from 'svelte/transition';
  import Ornithopter from './lib/sections/Ornithopter.svelte';
  import WebsiteSection from './lib/sections/WebsiteSection.svelte';
  import About from './lib/sections/About.svelte';
  import Valse from './lib/sections/Valse.svelte';
  import Satire from './lib/sections/Satire.svelte';
  import Pizza from './lib/sections/Pizza.svelte';
  import Slinky from './lib/sections/Slinky.svelte';
  import TurtleBot from './lib/sections/TurtleBot.svelte';
  import Printing from './lib/sections/Printing.svelte';
  import FRC from './lib/sections/FRC.svelte';
    
  let pages = {
    0: [HomeSection, About],
    1: [ProjectSection, Ornithopter,Slinky,TurtleBot, WebsiteSection, Valse, Satire,Pizza],
    2: [ExperienceSection, KnotUrsi, Harper,FRC,Printing],
    3: [ContactSection]
};
let verticals = {
    0: ["Home","About"],
    1: ["Projects", "Ornithopter","Slarm","TurtleBot","Website", "Valse d'eclairage","Satire","Vassar Pizza Daily!"],
    2: ["Experiences","Knot Theory" , "Harper","First Robotics","Covid"],
    3: ["Contact"]
};
  let pageIdx = 0;
  let activeButtonIdx = 0;
  let activeVerticalIdx = 0;
  let miniPage = 0;
  $: {
    activeButtonIdx = pageIdx;
  }
  $:{
    activeVerticalIdx = miniPage;
  }
  $: {
    document.documentElement.style.setProperty('--vnavbar-button-count', pages[pageIdx].length);
  }


  //listens for keypresses
  window.addEventListener('keyup', (event) => {
      
      if (event.key == "ArrowRight" ) {
        miniPage = 0;


      pageIdx = (pageIdx + 1) % Object.keys(pages).length;
      page.set(pageIdx);
    } else if (event.key == "ArrowLeft") {
      miniPage = 0;


      if (pageIdx == 0){
        pageIdx = Object.keys(pages).length-1;
        page.set(pageIdx);

      }
      else{
        pageIdx = (pageIdx - 1) % Object.keys(pages).length;
        page.set(pageIdx);

      }
    }
    else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        const currentVerticalLength = verticals[pageIdx].length;
        if (currentVerticalLength > 0) {
            if (event.key === "ArrowUp") {
                miniPage = (miniPage - 1 + currentVerticalLength) % currentVerticalLength;
            } else {
                miniPage = (miniPage + 1) % currentVerticalLength;
            }
        }
    }
    
    console.log(pageIdx);
  });


window.addEventListener('wheel', (event) => {


        if (event.deltaY < -100) {
            // Scroll down
            miniPage = (miniPage + 1) % verticals[pageIdx].length;
        } else if (event.deltaY > 100) {
            // Scroll up
            if (miniPage == 0) {
              miniPage = verticals[pageIdx].length - 1;
            } else {
                miniPage = (miniPage - 1) % verticals[pageIdx].length;
            }
        }

        // Allow page change again after a short delay (adjust the delay as needed)
    }
);

//  lines.subscribe((value)=> console.log(value));


  function goToHome() {
    // Handle navigation to Home
      pageIdx = 0;
      miniPage = 0;
      page.set(pageIdx);
      miniPage = 0;

  }

  function goToProjects() {
    // Handle navigation to Projects
    
      pageIdx = 1;
      miniPage = 0;
      page.set(pageIdx);
      miniPage = 0;

   }

  function goToExperience() {
    // Handle navigation to Experience
      pageIdx = 2;
      miniPage = 0;
      page.set(pageIdx);

    }
  function goToContact() {
    // Handle navigation to Experience
      pageIdx = 3;
      miniPage = 0;

      page.set(pageIdx);

    } 
  function goToVertical(index) {
    console.log(index);
  miniPage = index;
}

</script>

<main>
  {#key miniPage}
  <div class="containerMain" in:fly="{{y: -200, duration: 200}}"  >
              <svelte:component this={ pages[pageIdx][miniPage]} />
      </div>
  {/key}
  <nav class="vnavbar">
    {#each verticals[pageIdx] as vertical, index}
      <button
        class:active={activeVerticalIdx === index}
        on:click={() => goToVertical(index)}
      >
        {vertical}
      </button>
    {/each}
  </nav>
  <nav class="navbar">
    <button class:active={activeButtonIdx === 0} on:click={goToHome}>Home</button>
    <button class:active={activeButtonIdx === 1} on:click={goToProjects}>Projects</button>
    <button class:active={activeButtonIdx === 2} on:click={goToExperience}>Experiences</button>
    <button class:active={activeButtonIdx === 3} on:click={goToContact}>Contact</button>

  </nav>
</main>

<style>
  .containerMain{
    position:fixed;
    left: 16%;
    top:30%;
    height: 100%;
  }
  
  .navbar {
    position: fixed;
    top:2%;
    left: 20%;
    width: 30%;
    color: white; /* Change the text color as needed */
    display: flex;
    justify-content: space-around;
    padding: 1vw;
    border-top: solid 3px ;
    border-image: linear-gradient(to left, rgb(248, 248, 248), rgb(242, 255, 122)) 1;
    text-shadow: 2px 2px 2px black; /* Add a 1px black outline */
    font-weight: bold;

}


.navbar button:not(.active) {
    opacity: 0.5; /* You can adjust the opacity value as needed */
  }
  .navbar button {
    background: none;
    border: none;
    color: white;
    font-size: 1vw;
    cursor: pointer;
    font-weight: bolder;
    text-shadow: 8px 8px 8px black;

  }

  .vnavbar {
  position: fixed;
  top: 30%;
  left: 2%;
  width: 5%;
  color: white;
  display: flex;
  flex-direction: column; /* Display buttons in a vertical column */
  justify-content: space-between; /* Add space between buttons */
  align-items: center; /* Center-align buttons horizontally */
  padding: 1vw;
  border-left: solid 3px;
  border-image: linear-gradient(to left, rgb(248, 248, 248), rgb(242, 255, 122)) 1;
  text-shadow: 8px 8px 8px black;
  font-weight: bold;
  height: calc(7% * var(--vnavbar-button-count));}

.vnavbar button:not(.active) {
  opacity: 0.5;
}

.vnavbar button {
  background: none;
  border: none;
  color: white;
  font-size: 1vw;
  cursor: pointer;
  font-weight: bolder;
  text-shadow: 8px 8px 8px black;
  width: 100%; /* Make the buttons full width within the container */
}

@media only screen and (max-width: 768px) {
         .containerMain{
    position:fixed;
    left: 16%;
    top:30%;
    height: 100%;
  }
  
  .navbar {
    position: fixed;
    top:2%;
    left: 0%;
    width: 100%;
    color: white; /* Change the text color as needed */
    display: flex;
    justify-content: space-around;
    padding: 1vw;
    border-top: solid 3px ;
    border-image: linear-gradient(to left, rgb(248, 248, 248), rgb(242, 255, 122)) 1;
    text-shadow: 1px 1px 1px black; /* Add a 1px black outline */
    font-weight: bold;

}


.navbar button:not(.active) {
    opacity: 0.5; /* You can adjust the opacity value as needed */
  }
  .navbar button {
    background: none;
    border: none;
    color: white;
    font-size: 3vw;
    cursor: pointer;
    font-weight: bolder;
    text-shadow: 8px 8px 8px black;

  }

  .vnavbar {
  position: fixed;
  top: center;
  left: 2%;
  width: 1%;
  color: white;
  display: flex;
  flex-direction: column; /* Display buttons in a vertical column */
  justify-content: space-between; /* Add space between buttons */
  align-items: center; /* Center-align buttons horizontally */
  padding: 1vw;
  border-left: solid 3px;
  border-image: linear-gradient(to left, rgb(248, 248, 248), rgb(242, 255, 122)) 1;
  text-shadow: 8px 8px 8px black;
  font-weight: bold;
  height: calc(5% * var(--vnavbar-button-count));}

.vnavbar button:not(.active) {
  opacity: 0.5;
}

.vnavbar button {
  background: none;
  border: none;
  color: white;
  font-size: 2vw;
  cursor: pointer;
  font-weight: bolder;
  text-shadow: 8px 8px 8px black;
  width: 100%; /* Make the buttons full width within the container */
}
}
</style>
