<script>
    import { onMount } from "svelte";
    import { tweened } from "svelte/motion";
  
    let blur = tweened(0, { duration: 2000 }); // Adjust the duration as needed
  
    onMount(() => {
      blur.set(15); // Set the final blur value here
    });
  </script>
  
  <main>
    <div id="content-container">
    <div id="title-block">
      <p id="hi-text">First Robotics</p>
      <p id="name-text">UHSSE 2017-2021</p>
      <p id="sub-name-text" style="backdrop-filter: blur({$blur}px);">
        During my time with Team 1991 Dragons in First Robotics, I worked my way up from programming lead to electrical lead and eventually team captain. I gained valuable experience in team management and system integration. We used OpenCV, LabVIEW, Java, Python, and various electronics. I developed strong CAD and 3D printing skills. I am most proud of us receiving the Autonomous Systems Award my final year for our robot's precise machine vision and machine learning-assisted performance. Over four years, we built three 125-pound robots, tackled various challenges, and fostered collaboration between experienced engineers and newcomers. This team will always be close to my heart.</p>
    </div>
  
    <img class="mounted-image" src="/robot1991.jpg" alt="RobotPhoto">
</div>
</main>
<style>
      #content-container {
    display: flex;
  }

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
    height: 20vw;
    opacity: 0; /* Initially, set opacity to 0 for the fade-in effect */
    border: .3vw solid rgb(249, 251, 177);
    border-radius: 5px;
    animation: fadein .5s ease-in forwards; /* Apply the fade-in animation */
    animation-delay: .2s;
  }

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
.mounted-image {
   display:none;}
  
    }
  </style>
  