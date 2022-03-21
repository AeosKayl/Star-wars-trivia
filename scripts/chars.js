export class Character{
  constructor(name, gender, height, mass, hair_color, pictureUrl){
    this.name = name;
    this.gender = gender;
    this.height = height;
    this.mass = mass;
    this.hair_color = hair_color;
    this.pictureUrl =pictureUrl;
  }

  genderComparison(second_character){
    return this.gender === second_character.gender;
  }
  colourComparison(second_character){
    return this.hair_color === second_character.hair_color;
  }
  heightComparison(second_character){
    return this.height - second_character.height;
  }
  weightComparison(second_character){
    return this.mass - second_character.mass;
  }

}