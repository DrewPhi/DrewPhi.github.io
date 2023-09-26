<script>
  import HomeSection from './lib/sections/HomeSection.svelte';
  import ProjectSection from './lib/sections/ProjectSection.svelte';
  import ExperienceSection from './lib/sections/ExperienceSection.svelte';
  import ContactSection from './lib/sections/ContactSection.svelte';
  import {page } from './stores.js';
    import KnotUrsi from './lib/sections/KnotUrsi.svelte';
    import Harper from './lib/sections/Harper.svelte';
    import { fly } from 'svelte/transition';
    import Project1 from './lib/sections/Project1.svelte';
  let pages = {
    0: [HomeSection],
    1: [ProjectSection, Project1, "P3"],
    2: [ExperienceSection, KnotUrsi, Harper],
    3: [ContactSection]
};
let verticals = {
    0: ["Home"],
    1: ["Projects", "P1", "P3"],
    2: ["Experiences","Knot Theory" , "Harper"],
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


        if (event.deltaY > 75) {
            // Scroll down
            miniPage = (miniPage + 1) % verticals[pageIdx].length;
        } else if (event.deltaY < -75) {
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
      page.set(pageIdx);

  }

  function goToProjects() {
    // Handle navigation to Projects
    
      pageIdx = 1;
      page.set(pageIdx);

   }

  function goToExperience() {
    // Handle navigation to Experience
      pageIdx = 2;
      page.set(pageIdx);

    }
  function goToContact() {
    // Handle navigation to Experience
      pageIdx = 3;
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
  text-shadow: 2px 2px 2px black;
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
  font-weight: bold;
  text-shadow: 4px 4px 4px black;
  width: 100%; /* Make the buttons full width within the container */
}

</style>
