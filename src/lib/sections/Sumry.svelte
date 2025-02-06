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
      <p id="hi-text">Mathematics Research</p>
      <p id="name-text">Yale SUMRY REU summer 2024</p>
      <p id="sub-name-text" style="backdrop-filter: blur({$blur}px);">
        During my summer at Yale's SUMRY program, I worked with a group of 9 students on Geometric Manifold Learning. We used diffusion geometry to create a manifold from network representations and characterized it by various structural and statistical properties. We found that high-performing networks shared similar embedding features and explored hyperparameter and architecture optimization through manifold sampling. Our work has been submitted to AISTATS 2025, and we are continuing research on generating networks from this manifold towards another paper. (The paper attached is outdated, I will update it when the its accepted or the preprint is done.) </p>
      <a href="/PaperKnot.pdf">
      <p id  = "last-word" >View Our Paper</p>
      <a/>
    </div>
  
    <iframe
      title="pdf"
      id="pdf"
      src="/manifold.pdf"
      style="width: 30%; height: 75%;"
      frameborder="0"
    ></iframe>
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
#pdf {
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
  