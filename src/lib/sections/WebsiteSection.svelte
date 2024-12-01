<script>
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";

  let blur = tweened(0, { duration: 2000 }); // Adjust the duration as needed

  onMount(() => {
    blur.set(15); // Set the final blur value here
  });
</script>

<main>

  <div id="title-block">
    <p id="hi-text">This Website</p>
    <p id="name-text">Updated October 2024</p>
    <p id="sub-name-text" style="backdrop-filter: blur({$blur}px);">I designed and created this website to have a place to log my projects and experiences. This was built with Svelte and Vite. The background of this website was made with p5.js and is a Perlin noise flowField. You can click to scramble the Noise!</p>
    </div>

    <iframe class = "mounted-image" src="https://drewphi.github.io/" title="Website"></iframe> 
</main>
<style>

    #last-word{
    font-size: 2vw;
    display: inline-block;
    margin-top: 2vh;
    font-weight: bold;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    color:       rgb(249, 251, 177);
    white-space: pre-wrap;
    border-bottom: rgb(249, 251, 177) solid 4px;
  }
  .mounted-image {
    position: fixed;
    top: 35%;
    right: 10%;
    width: 30%;
    height: 36%;
    opacity: 0; /* Initially, set opacity to 0 for the fade-in effect */
    border: .3vw solid rgb(249, 251, 177);
    border-radius: 5px;
    animation: fadein .5s ease-in forwards; /* Apply the fade-in animation */
    animation-delay: .4s;  }


  #title-block {
    text-align: left;
    width: 35vw;
    margin: 0vh 10vh 0; 
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  #hi-text {
    font-size: 3vw;
    color: white;
    font-weight: bold;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    white-space: pre-wrap;
    margin: 0;
  }

  #name-text {
    font-size: 2vw;
    color: rgb(249, 251, 177);
    margin: 0;
    font-weight: bold;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    white-space: pre-wrap;
    padding-bottom: 5%;
  }

  #sub-name-text {
    font-size: 1vw;
    margin: 0;
    font-weight: bold;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    color: white;
    white-space: pre-wrap;
    border: 1px solid rgb(249, 251, 177);
    border-radius: 5px;
    padding: 1vw;
  }

  @media only screen and (max-width: 768px) {

#title-block {
  text-align: left;
  width: 70vw;
  margin: 0vh 3vh 0; /* Adjust top margin to move it upwards */
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

#hi-text {
  font-size: 7vw;
  color: white;
  font-weight: bold;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  white-space: pre-wrap;
  margin: 0;
}

#name-text {
  font-size: 4vw;
  color: rgb(249, 251, 177);
  margin: 0;
  font-weight: bold;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  white-space: pre-wrap;
  padding-bottom: 5%;
}

#sub-name-text {
  font-size: 3.5vw;
  margin: 0;
  font-weight: bold;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  color: white;
  white-space: pre-wrap;
  border: 1px solid rgb(249, 251, 177);
  border-radius: 5px;
  padding: 3vw;
}
.mounted-image {
  position: relative;
  margin-top: 5%;
  right: 10%;
  width: 70%;
  height: 20%;
  opacity: 0; /* Initially, set opacity to 0 for the fade-in effect */
  border: .3vw solid rgb(249, 251, 177);
  border-radius: 5px;
  animation: fadein .5s ease-in forwards; /* Apply the fade-in animation */
  animation-delay: .2s;  }
    }
</style>
