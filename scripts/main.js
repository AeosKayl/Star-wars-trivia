console.log("Hello Boy!");
import { fetchCharacters } from "../scripts/fetchdata.js";


//testing fetch
let fetchData = async (url) =>{
  let response = await fetch(url);
  let json = await response.json();
  return json;
}

let onRender = async ()=>{
  let characters = await fetchData("https://swapi.dev/api/people/");
  console.log(characters);
}

onRender();