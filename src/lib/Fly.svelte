<script>
    import { onMount } from "svelte";
  
    let words = ["Mathematician", "Roboticist   ", "Developer    ", "Musician     ","Student      ", "Human        "];
    let flyText = words[0];
    let lastWord = words[0];
    let flyIndex = 0;
    let indexIndex = 0;
    let hash = false;
    let decode = [];
    function fly() {
      console.log(decode);
      console.log(words[flyIndex][decode[indexIndex]]);
      console.log(hash)
      if (flyText == words[flyIndex]) {
        lastWord = words[flyIndex];
        flyIndex = (flyIndex + 1) % words.length;
        decode = shuffleChars(words[flyIndex]);
        indexIndex = 0;
        setTimeout(fly, 3000);
      } else if (hash) {
        if (indexIndex == 13) {
          flyText = flyText.substring(0, decode[indexIndex]) + words[flyIndex][decode[indexIndex]];
        } else {
          flyText = flyText.substring(0, decode[indexIndex]) + words[flyIndex][decode[indexIndex]] + flyText.substring(decode[indexIndex] + 1);
        }
        indexIndex++;
        hash = false;
        setTimeout(fly, 55);
      } else {
        if (lastWord[decode[indexIndex]] == words[flyIndex][decode[indexIndex]]) {
          hash = true;
          setTimeout(fly, 0);
        } else if (indexIndex == 13) {
          flyText = flyText.substring(0, decode[indexIndex]) + "■";
          hash = true;
          setTimeout(fly, 55);

        } else {
          flyText = flyText.substring(0, decode[indexIndex]) + "■" + flyText.substring(decode[indexIndex] + 1);
          hash = true;
          setTimeout(fly, 55);
        }
      }
    }

    function shuffleChars(string) {
      let arr = [string.length]
      for (let i = 0; i < string.length; i++) {
        arr[i] = i;
      }
      arr.sort(() => Math.random() - 0.5);
      return arr;
    }
  
    onMount(fly);

  </script>
  
  <span id="flytext">{flyText}</span>
  
  <style>
    #flytext {
      color: rgb(249, 251, 177);
      font-weight: bold;
      text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
      margin: 0;
      letter-spacing: 5px;
    }
  

  </style>
  