import {lines,page} from './stores.js';
let mylines;
let pageValue;
export default function fly(from, to,line,myPage) {
  console.log(myPage);
   page.subscribe(value => {
        pageValue = value;
    });
    //console.log(myPage,pageValue);
    if (myPage !== pageValue){
        console.log(myPage,pageValue);
        return from;
    }
   //console.log(from,to,line);
    if (from.length !== to.length) {
        if (from.length > to.length) {
            to += " ".repeat(from.length - to.length);
        }
        else {
            from += " ".repeat(to.length - from.length);
        }
    }
    lines.subscribe(value => {
        mylines = value;
    })
    mylines[line] = from.trim() + " ";
    lines.set(mylines);
    let differencesArray = [];
    if (from === to) {
      return from.trim();
    }
    else if (from.search("■") === -1) {
      for (let i = 0; i < from.length ; i++){
          if (from[i] !== to[i]){
              differencesArray.push(i);                
          }
      }
      
      let chosenIndex = differencesArray[Math.floor(Math.random()*differencesArray.length)];
      setTimeout(fly, 40, from.substring(0, chosenIndex) + '■' + (chosenIndex == from.length - 1 ? '' : from.substring(chosenIndex + 1)), to,line,myPage);
    }
    else{
      setTimeout(fly, 40,from.replace("■", to[from.search("■")]), to,line,myPage);
    }
    
  }