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
let compContainer = document.querySelector(".comparison-list-container");
let compInputContainer = document.querySelector(".comparison-input-container");
let compOption = document.createElement("option");
let compSaveBtn = document.querySelector(".saveBtn");
let compSelection = document.querySelector("#comp-history");
let markFavBtn = document.querySelector(".make-fav");
let compHistoryName = [];
let comparedCharacters = {};
let comparedCharList = [];

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

const createComparedChars = (name) => {
  let comparisonChoices = [firstCharSelect.value, secondCharSelect.value];
  let comparisonName = name;
  // let comparisonName = document.querySelector(".comp-name").value;
  // let editName = prompt("Edit the name of your choice!",comparisonName);
  // console.log(typeof editName);
  // if(editName !== undefined){
  //   comparisonName = editName;
  // }
  comparedCharacters = {
    name: comparisonName,
    characterNames: comparisonChoices,
    favourite: false,
  };

  //*for storing in local storage, needs tweeking and the right approach
  // localStorage.setItem(comparisonName, comparisonChoices);
  const comparisonHistoryCount = compHistoryName.push(comparisonName);
  console.log(compHistoryName);
  console.log(comparisonHistoryCount);
  console.log(comparedCharacters);
  // return comparisonName;
  return comparedCharacters;
};

// let compOption = document.createElement("option");
// let compSaveBtn = document.querySelector(".saveBtn");
// let compSelection = document.querySelector("#comp-history");
console.log(compSaveBtn, compSelection);

//*eventlistener for save button
compSaveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let comparisonName = document.querySelector(".comp-name").value;
  let editName = prompt(
    "Edit the name of your choice!",
    document.querySelector(".comp-name").value
  );
  if (editName === "" || editName === undefined || editName === null) {
    alert("You can not have an empty name");
    return false;
  } else {
    comparisonName = editName;
  }
  let compChars = createComparedChars(comparisonName);
  comparedCharList.push(compChars);
  //*TODO think about cleanup.
  console.log(comparedCharList, comparedCharList.name);
  document.querySelector(".comp-name").value = "";
  compSelection.innerHTML = "";

  // for creating dropdown list
  comparedCharList.forEach((comparison, index) => {
    let compOptions = document.createElement("option");
    compOptions.innerText = comparison.name;
    compOptions.setAttribute("id", index);
    compOptions.setAttribute("value", comparison.name);
    compOptions.setAttribute("favourite", comparison.favourite);
    console.log(comparison);
    compSelection.append(compOptions);
  });

  // localStorage.clear();

  //*if there's a key in localstorage,do this
  // if (localStorage.getItem(compName)) {
  //   compOption.innerText = compName;
  //   console.log(compOption.innerText);
  //   compSelection.appendChild(compOption);
  // }
});

let selectBtn = document.querySelector("select.comp-history");
// let optionBtn = document.querySelector(".comp-history option");
//* eventlistener that generates the selected comparison
selectBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // let optionBtn = document.querySelector(".comp-history option");
  console.log(selectBtn.value);
  // console.log(optionBtn);
  let index = comparedCharList
    .map((object) => object.name)
    .indexOf(selectBtn.value);
  console.log(index);
  if (selectBtn.value) {
    firstCharSelect.value = comparedCharList[index].characterNames[0];
    secondCharSelect.value = comparedCharList[index].characterNames[1];
    infoBtn.click();
  }
});

markFavBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let optionBtns = document.querySelectorAll(".comp-history option");
  let optionBtnsArray = [...optionBtns];
  let selectedOption = optionBtnsArray.map(
    (option) => (option.selected = true)
  );

  console.log(optionBtns);
  console.log(optionBtnsArray);
  console.log(selectedOption);
  console.log(selectBtn.value);
});

//* dblclick event attempt to make a fav
// selectBtn.addEventListener("dblclick", (e) => {
//   e.preventDefault();
//   let optionBtn = document.querySelector(".comp-history option");
//   let makeFav = prompt("Would you like to mark this as favourite?", "yes");
//   if (makeFav === "yes") {
//     optionBtn.classList.add("fav");
//   }
//   // optionBtn.classList.add("fav");
// });

//* possible function for creating options
// const createList = () => {
//   comparedCharList.forEach((comparison) => {
//     let compOptions = document.createElement("option");
//     compOptions.innerText = comparison.name;
//     console.log(comparison);
//     compSelection.append(compOptions);
//   });
// };

// createList();

//* for showing the keys stored in localStorage
// const storageItems = { ...localStorage };
// console.log(storageItems);
// const keys = Object.keys(localStorage);
// if (keys) {
//   let i = keys.length;
//   while (i--) {
//     console.log(localStorage.getItem(keys[i]));
//   }
// }
