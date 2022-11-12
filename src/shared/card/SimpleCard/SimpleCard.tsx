import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { capatalizeFirst } from "../../../helpers/HelperFunctions";
import { pokemonDetailed } from "../../../types/PokemonObjectTypes";
import "./SimpleCard.css";

export const SimpleCard = (props: { pokemon: pokemonDetailed }) => {
  
  const [currentPokemon, setPokemon] = useState({
    name: "",
    url: "",
    descriptionURL: "",
    id:"",
    imgURL:""
  });

  useEffect(() => {
    const API = props.pokemon.url;
    fetchNewPokemon(API);
  }, []);
  
  const fetchNewPokemon = async (url: string) => {
    try {
      const new_pokemon_response = await fetch(url);
      const new_pokemon_json = await new_pokemon_response.json();
      const new_pokemon = {
        name: capatalizeFirst(new_pokemon_json.name),
        url: new_pokemon_json.url,
        id: new_pokemon_json.id,
        imgURL: new_pokemon_json.sprites.front_default,
        type: new_pokemon_json.types,
        stats: new_pokemon_json.stats,
        descriptionURL: new_pokemon_json.species.url,
      };
      setPokemon(new_pokemon);
    } catch (error) {
      console.log("error", error);
    }
  };
  
  return (
    <Link to={"/Details/" + currentPokemon.name}>
      <div className="simple_card">
        <label className="id-num-s">{"#" + currentPokemon.id}</label>
        <div className="img-div-s">
          <img
            className="poke-img-s"
            src={currentPokemon.imgURL}
            alt={"pokemon"}
          ></img>
        </div>
        <div className="name-sec">
          <p className="name-s">{currentPokemon.name}</p>
        </div>
      </div>
    </Link>
  );
  
};
