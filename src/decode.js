import {lines} from './stores.js';

function fly(from, to,line) {
    if (from.length !== to.length) {
        if (from.length > to.length) {
            to += " ".repeat(from.length - to.length);
        }
        else {
            from += " ".repeat(to.length - from.length);
        }
    }
    lines[line] = from;
    let differencesArray = [];
    if (from === to) {
      return from;
    }
    else if (from.search("■") === -1) {
      for (let i = 0; i < from.length ; i++){
          if (from[i] !== to[i]){
              differencesArray.push(i);                
          }
      }
      
      let chosenIndex = differencesArray[Math.floor(Math.random()*differencesArray.length)];
      setTimeout(fly, 40, from.substring(0, chosenIndex) + '■' + (chosenIndex == from.length - 1 ? '' : from.substring(chosenIndex + 1)), to,line);
    }
    else{
      setTimeout(fly, 40,from.replace("■", to[from.search("■")]), to,line);
    }
    
  }