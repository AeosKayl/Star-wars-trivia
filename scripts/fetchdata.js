export async function fetchCharacters(characterName){
  let fetchResponse = await fetch(`https://swapi.dev/api/people/?search=${characterName}`);
  const character =await fetchResponse.json();
  // console.log(character);
}