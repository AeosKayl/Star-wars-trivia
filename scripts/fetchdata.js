import { Character } from "../scripts/chars.js";
export async function fetchCharacter(characterName){

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

  /*  <option value="Luke Skywalker">Luke Skywalker</option>
            <option value="Chewbacca">Chewbacca</option>
            <option value="Bobba Fett">Bobba Fett</option>
            <option value="Darth Vader">Darth Vader</option>
            <option value="Palpatine">Palpatine</option>
            <option value="Obi Wan Kenobi">Obi Wan Kenobi</option>
            <option value="Yoda">Yoda</option>
            <option value="Leia Organa">Leia Organa</option> */

  let fetchResponse = await fetch(`https://swapi.dev/api/people/?search=${characterName}`);
  const hero =await fetchResponse.json();
  return new Character(   //*returnera en ny instans av character med parametrarna
    hero.results[0].name,
    hero.results[0].gender,
    parseFloat(hero.results[0].height),
    parseFloat(hero.results[0].mass),
    hero.results[0].hair_color,
    charImages[hero.results[0].name]
  );
  // console.log(character);
}