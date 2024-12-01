<script>
    import { onDestroy, onMount } from "svelte";
    import { tweened } from "svelte/motion";
  
    let blur = tweened(0, { duration: 2000 }); // Adjust the duration as needed
  
    onMount(() => {
      blur.set(15); // Set the final blur value here
    });
  </script>
  
  <main>
    <div id="title-block">
      <p id="hi-text">Talks I have given</p>
      <p id="name-text">Exploring the Landscape of Neural Networks Using Diffusion Geometry.</p>
      <p id="sub-name-text">July 2024 / Jane Street Mathematics Conference (Poster).</p>

      <p id="name-text">Alpha Zero Vs To Knot or Not to Knot.</p>
      <p id="sub-name-text">July 2024 / UnKnot V Conference.</p>
      <p id="sub-name-text">April 2024 / Hudson River Mathematics Conference.</p>

      <p id="name-text">Integrated Vision, Language, and Motor Control in a Humanoid Robot.</p>
      <p id="sub-name-text">September 2023 / Vassar URSI Symposium (Poster).</p>

      <p id="name-text">The Distribution of Genera of 2-Bridge Knots.</p>
      <p id="sub-name-text">April 2023 / Hudson River Mathematics Conference.</p>
      <p id="sub-name-text">September 2022 / SUNY New Paltz Symposium for Undergrad Math Research.</p>
      <p id="sub-name-text">September 2022 / Vassar URSI Symposium (Poster).</p>


    </div>
  </main>
  
  <style>

  
    #title-block {
      text-align: left;
      width: 40vw;
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
      font-size: 2vw;
      color: white;
      font-weight: bold;
      text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
      white-space: pre-wrap;
      margin: 0;
    }
  
    #name-text {
      font-size: 1.3vw;
      color: rgb(249, 251, 177);
      margin: 0;
      font-weight: bold;
      text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
      white-space: pre-wrap;
      padding-bottom: 0%;
    }
  
    #sub-name-text {
      font-size: .9vw;
      margin: 0;
      font-weight: bold;
      text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
      color: white;
      white-space: pre-wrap;
      border: 0px solid rgb(249, 251, 177);
      border-radius: 5px;
      padding-left: 2vw;
    }
    #last-word{

display:none;
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
  padding-bottom: 0%;
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
  padding: 0vw;
}

  #last-word{

font-size: 3vw;
display: inline-block;
margin-top: 2vh;
font-weight: bold;
text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
color:       rgb(249, 251, 177);
white-space: pre-wrap;
border-bottom: rgb(249, 251, 177) solid 4px;
}
    }
  </style>
  