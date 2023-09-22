<script>
  import HomeSection from './lib/sections/HomeSection.svelte';
  import ProjectSection from './lib/sections/ProjectSection.svelte';
  import ExperienceSection from './lib/sections/ExperienceSection.svelte';
  import ContactSection from './lib/sections/ContactSection.svelte';
  import { fly } from 'svelte/transition';
  import { cubicIn, cubicOut } from 'svelte/easing';
  import { lines,flying } from './stores.js';
  let pages = [HomeSection,ProjectSection,ExperienceSection,ContactSection]
  let pageIdx = 0;
  let resize = false;
  let activeButtonIdx = 0;
  let localFlying;
  $: {
    activeButtonIdx = pageIdx;
  }
  //listens for keypresses
  window.addEventListener('keyup', (event) => {
    flying.subscribe((value)=> localFlying = value);
    if (!localFlying){
      if (event.key == "ArrowRight" ) {
      pageIdx = (pageIdx + 1) % pages.length;
    } else if (event.key == "ArrowLeft") {
      if (pageIdx == 0){
        pageIdx = pages.length-1;
      }
      else{
        pageIdx = (pageIdx - 1) % pages.length;
      }
    }
    }
    
  });

//  lines.subscribe((value)=> console.log(value));


  function goToHome() {
    // Handle navigation to Home
    flying.subscribe((value)=> localFlying = value);
    if (!localFlying){
      pageIdx = 0;
    }
  }

  function goToProjects() {
    // Handle navigation to Projects
    flying.subscribe((value)=> localFlying = value);
    if (!localFlying){
      pageIdx = 1;
    }  }

  function goToExperience() {
    // Handle navigation to Experience
    flying.subscribe((value)=> localFlying = value);
    if (!localFlying){
      pageIdx = 2;
    }  }
  function goToContact() {
    // Handle navigation to Experience
    flying.subscribe((value)=> localFlying = value);
    if (!localFlying){
      pageIdx = 3;
    }  }
</script>

<main>
  {#key pageIdx}
      <div class = "containerMain">
          <svelte:component this={pages[pageIdx]} />
      </div>
  {/key}
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
    border-image: linear-gradient(to right, rgb(248, 248, 248), rgb(242, 255, 122)) .5;
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
  /* Add your styles here if needed */

</style>
