import { Character } from "../scripts/chars.js";
export async function fetchCharacter(characterName){

  //* assigning images to fetched characters that exist in html selections
  let charImages = {
    "Luke Skywalker": "images/Luke.jpg",
    "Chewbacca": "images/Chewbacca.jpg",
    "Boba Fett": "images/Boba.jpg",
    "Darth Vader": "images/Darth.jpg",
    "Palpatine": "images/Palpatine.jpg",
    "Obi-Wan Kenobi": "images/Obi.jpg",
    "Yoda": "images/Yoda.jpg",
    "Leia Organa": "images/Leia.jpg"
  };

  //* fetching characters and saving the response in a variable
  let fetchResponse = await fetch(`https://swapi.dev/api/people/?search=${characterName}`);
  const hero =await fetchResponse.json();
  return new Character(   //*returnera en ny instans av character med parametrarna
    hero.results[0].name,
    hero.results[0].gender,
    parseFloat(hero.results[0].height).toFixed(2),
    parseFloat(hero.results[0].mass).toFixed(2),
    hero.results[0].hair_color,
    charImages[hero.results[0].name]
  );
  // console.log(character);
}