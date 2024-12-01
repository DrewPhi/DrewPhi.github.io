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
      <p id="hi-text">Humanoid Robotics</p>
      <p id="name-text">Vassar REU Summer 2023</p>
      <p id="sub-name-text" style="backdrop-filter: blur({$blur}px);">
        As an URSI fellow at Vassar, I worked on a team of two developing a humanoid robot named Harper. Our job was to develop the hardware and software infrastructure for human-like perception and action. We designed and implemented a custom control architecture, coordinating vision, language, and motor control systems. We've been working with Nvidia's Jetson AGX Orin, DepthAI, Ros2, MicroRos, Nvidia Riva SDK, Arduino, and more. This experience has become an ongoing project.</p>
        <a href="/URSI_26_KenLivingston_MichaelFerrante_AndrewJSteindl_flat.pdf">
       <p id  = "last-word" >View Our Poster</p>
    </a>
    </div>
  
    <iframe title = "video" class="mounted-image" src="https://www.youtube.com/embed/mwKXxNulNms" frameborder="0" allowfullscreen></iframe>

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
  display:none;}
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
  