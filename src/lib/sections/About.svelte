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
      <p id="hi-text">About Me!</p>
      <p id="name-text">Updated October 2024</p>
      <p id="sub-name-text" style="backdrop-filter: blur({$blur}px);">Hi! I'm Drew, a student at Vassar College studying Pure and Applied Mathematics. I also have an unwavering enthusiasm for the world of Robotics. I've been learning, tinkering, and breaking things my whole life. Feel free to explore my portfolio to see what I've been up to :)</p>
      <a href="/RESUMEFINAL.pdf">
        <p id  = "last-word" >My Resume</p>
     </a>
    </div>

  
  
  </main>
  <style>

#pdf {
      position: fixed;
      top: 15%;
      right: 10%;
      opacity: 0; /* Initially, set opacity to 0 for the fade-in effect */
      animation: fadein .5s ease-in forwards; /* Apply the fade-in animation */
      animation-delay: .2s;
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
      margin: 5vh 10vh 0; /* Adjust top margin to move it upwards */
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
  margin: 5vh 3vh 0; /* Adjust top margin to move it upwards */
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
    }
  </style>
  