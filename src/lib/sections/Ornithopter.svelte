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
    <p id="hi-text">Modular Ornithopter</p>
    <p id="name-text">Vassar Ongoing</p>
    <p id="sub-name-text" style="backdrop-filter: blur({$blur}px);">I've designed and constructed an open source biomimetic modular ornithopter with a professor here at Vassar. The ornithopter will let us test a perforated wing design based on real bird feathers. The wing passively opens up on the upstroke of a flap to allow air to pass through and closes on the downstroke just as real birds do. We will compare this wing design with a classical solid wing design to study its advantages and gain insights into the role feathers play in bird evolution. The ornithopter is powered by a 2S brushless motor and is predominantly 3D printed. I am hoping the expiriment will happen next semester.</p>
    <a href="/Ornithopter_Public_Tutorial.pdf">
      <p id  = "last-word" >How to Build it</p>
      <a/>
   <img class="mounted-image" src="/BirdPhoto.png" alt="3D printed Bird">

  </div>


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
  animation-delay: .2s;  }


  #title-block {
    text-align: left;
    width: 35vw;
    margin: 0vh 10vh 0; /* Adjust top margin to move it upwards */
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
    .mounted-image {
  display:none; }
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
  font-size: 2.5vw;
  margin: 0;
  font-weight: bold;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  color: white;
  white-space: pre-wrap;
  border: 1px solid rgb(249, 251, 177);
  border-radius: 5px;
  padding: 3vw;
}
    }
</style>
