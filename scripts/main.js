console.log("Hello Boy!");

// import { Character } from "../scripts/chars.js";
import { fetchCharacter } from "../scripts/fetchdata.js";

//* creating needed variables
let infoBtn = document.querySelector(".info-btn");
let firstCharSelect = document.getElementById("first-char");
let secondCharSelect = document.getElementById("second-char");
// console.log(firstCharSelect,secondCharSelect);
let firstCharBox = document.querySelector(".char-1-wrapper");
let secondCharBox = document.querySelector(".char-2-wrapper");
console.log(firstCharBox, secondCharBox);
let infoText = document.querySelector(".text-msg");
// console.log(infoText);
//* variables needed for the comparison feature

let compHistoryName = [];

//* functions that will be used for the app
function createCharacter(char1, char2, place) {
  let heroInfo = place.querySelector(".char-summary");
  let heroImage = place.querySelector(".char-image img");
  if (char1 === undefined) {
    heroInfo.style.display = "none";
    heroImage.src = "images/Unknown.jpg";
  } else {
    heroInfo.style.display = "block";
    let charName = place.querySelector(".char-name");
    charName.innerText = `${char1.name}`;
    heroImage.src = `${char1.pictureUrl}`;

    //* gender comparison
    place.querySelector(".gender").addEventListener("click", () => {
      let genderOption = char1.genderComparison(char2);
      if (!genderOption) {
        infoText.innerText = `I, ${char1.name}, and ${char2.name} are of opposite sex. I'm ${char1.gender} while
        ${char2.name} is ${char2.gender}.`;
      } else {
        infoText.innerText = `I, ${char1.name}, and ${char2.name} are of the same sex! We both are ${char1.gender}.`;
      }
    });

    //* hair colour comparison
    place.querySelector(".hair").addEventListener("click", () => {
      let hairOption = char1.colourComparison(char2);
      if (hairOption) {
        if (char1.hair_color === "none") {
          infoText.innerText = `I, ${char1.name} do not have hair nor does ${char2.name}.`;
        } else {
          infoText.innerText = `I, ${char1.name}, have the same beautiful ${char1.hair_color} hair as ${char2.name}.`;
        }
      } else {
        if (char1.hair_color === "none") {
          infoText.innerText = `I, ${char1.name}, and ${char2.name} have different hair colors. I do not need hair to look good, while ${char2.name}'s mediocre ${char2.hair_color} hair is awful.`;
        } else if (char2.hair_color === "none") {
          infoText.innerText = `I, ${char1.name}, and ${char2.name} have different hair colors. I have this amazing ${char1.hair_color} hair while ${char2.name} has ${char2.hair_color}. Don't you dare compare my hair with ${char2.name}'s.`;
        } else {
          infoText.innerText = `I, ${char1.name}, and ${char2.name} have different hair colors. I prefer my beautiful ${char1.hair_color} hair color over ${char2.name}'s mediocre ${char2.hair_color}.`;
        }
      }
    });

    //* height comparison
    place.querySelector(".height").addEventListener("click", () => {
      let heightDiff = char1.heightComparison(char2);
      if (heightDiff > 0) {
        infoText.innerText = `I, ${char1.name}, am ${
          char1.height
        } cm tall while ${char2.name} is ${
          char2.height
        } cm tall. Basically I'm ${Math.abs(heightDiff)} cm taller.`;
      } else if (heightDiff < 0) {
        infoText.innerText = `I, ${char1.name}, am ${
          char1.height
        } cm tall while ${char2.name} is ${
          char2.height
        } cm tall. Guess I'm ${Math.abs(
          heightDiff
        )} cm shorter, but who cares because I'm smarter.`;
      } else {
        infoText.innerText = `I, ${char1.name}, am ${char1.height} cm tall and it seems to me that ${char2.name} is ${char2.height} cm tall too. Who would've thought that huh?.`;
      }
    });

    //* weight comparison
    place.querySelector(".weight").addEventListener("click", () => {
      let weightDiff = char1.weightComparison(char2);
      if (weightDiff > 0) {
        infoText.innerText = `I, ${char1.name}, weigh ${char1.mass} kgs while ${
          char2.name
        } weighs ${char2.mass} kgs. That means that I'm ${Math.abs(
          weightDiff
        ).toFixed(2)} kgs heavier but it's all muscles.`;
      } else if (weightDiff < 0) {
        infoText.innerText = `I, ${char1.name}, weigh ${char1.mass} kgs while ${
          char2.name
        } is ${char2.mass} kgs heavy. I'm ${Math.abs(weightDiff).toFixed(
          2
        )} kgs lighter because I watch my diet, unlike that brute ${
          char2.name
        }.`;
      } else {
        infoText.innerText = `I, ${char1.name}, and ${char2.name} weigh the same. ${char1.mass} kgs isn't that bad.`;
      }
    });
  }
}

infoBtn.addEventListener("click", async () => {
  let heroOneChoice = firstCharSelect.value;
  let heroTwoChoice = secondCharSelect.value;

  if (heroOneChoice !== "empty" && heroTwoChoice !== "empty") {
    if (heroOneChoice === heroTwoChoice) {
      infoText.innerText = "You are comparing me with myself? Alright then.";
    } else {
      infoText.innerText = "";
    }

    let hero1 = await fetchCharacter(heroOneChoice);
    let hero2 = await fetchCharacter(heroTwoChoice);
    createCharacter(hero1, hero2, firstCharBox);
    createCharacter(hero2, hero1, secondCharBox);
  } else {
    infoText.innerText =
      "You have not chosen your characters yet. Please do so!";
  }
});

const comparisonList = () => {
  let comparisonChoices = [firstCharSelect.value, secondCharSelect.value];
  let comparisonName = document.querySelector(".comp-name").value;

  localStorage.setItem(comparisonName, comparisonChoices);
  const comparisonHistoryCount = compHistoryName.push(comparisonName);
  console.log(compHistoryName);
  console.log(comparisonHistoryCount);
};

let compSaveBtn = document.querySelector(".saveBtn");
let compSelection = document.querySelector("#comp-history");
console.log(compSaveBtn, compSelection);
compSaveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  comparisonList();
  // localStorage.clear();
});
