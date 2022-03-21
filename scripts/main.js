console.log("Hello Boy!");

import { Character } from "../scripts/chars.js";
import { fetchCharacter } from "../scripts/fetchdata.js";


//* creating needed variables
let infoBtn = document.querySelector(".info-btn");
let firstCharSelect = document.getElementById("first-char");
let secondCharSelect = document.getElementById("second-char");
// console.log(firstCharSelect,secondCharSelect);
let firstCharBox = document.querySelector(".char-1-wrapper");
let secondCharBox = document.querySelector(".char-2-wrapper");
console.log(firstCharBox,secondCharBox);
let infoText = document.querySelector(".text-msg");
// console.log(infoText);


//* functions that will be used for the app
function createCharacter(char1,char2,place){
  let heroInfo = place.querySelector(".char-summary");
  let heroImage = place.querySelector(".char-image img");
  if(char1 === undefined){
    heroInfo.style.display = "none";
    heroImage.src = "images/Unknown.jpg";
  }
  else{
    heroInfo.style.display = "block";
    let charName = place.querySelector(".char-name");
    charName.innerText = `${char1.name}`;
    heroImage.src = `${char1.pictureUrl}`;
    place.querySelector(".gender").addEventListener("click", ()=>{
      let genderOption = char1.genderComparison(char2);
      if(!genderOption){
        infoText.innerText = `I, ${char1.name}, and ${char2.name} are of opposite sex. I'm ${char1.gender} while
        ${char2.name} is ${char2.gender}.`;
      }
      else{
        infoText.innerText = `I, ${char1.name}, and ${char2.name} are of the same sex! We both are ${char1.gender}.`;
      }
    })
  }

}

infoBtn.addEventListener("click", async ()=>{
  let heroOneChoice = firstCharSelect.value;
  let heroTwoChoice = secondCharSelect.value;

  if(heroOneChoice !== "empty" && heroTwoChoice !== "empty"){
    if(heroOneChoice === heroTwoChoice){
      infoText.innerText = "You are comparing me with myself? Alright then.";
    }
    else{
      infoText.innerText = "";
    }

    let hero1 = await fetchCharacter(heroOneChoice);
    let hero2 = await fetchCharacter(heroTwoChoice);
    createCharacter(hero1,hero2,firstCharBox);
    createCharacter(hero2,hero1,secondCharBox);
  }
  else{
    infoText.innerText = "You have not chosen your characters yet. Please do so!"
  }
})

// //*testing fetch
// let fetchData = async (url) =>{
//   let response = await fetch(url);
//   let json = await response.json();
//   return json;
// }

// let onRender = async ()=>{
//   let characters = await fetchData("https://swapi.dev/api/people/");
//   console.log(characters);
// }

// onRender();