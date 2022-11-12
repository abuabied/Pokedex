import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pokemonAPI } from "../../../constants/PokemonAPI";
import { capatalizeFirst, lowerFirst } from "../../../helpers/HelperFunctions";
import { stat, type } from "../../../types/PokemonObjectTypes";
import { pokemonDetailed } from "../../../types/PokemonObjectTypes";
import "./DetailedCard.css";

export const DetailedCard = (props: { pokemon: pokemonDetailed }) => {
  const [currentPokemon, setPokemon] = useState({
    name: "",
    url: "",
    descriptionURL: "",
    id: "",
    imgURL: "",
    type: [],
    stats: [],
    total_stat: 0
  });
  const [description, setDescription] = useState("");
  const { pokemon } = useParams();
  const pokemon_name = lowerFirst(pokemon as string);

  useEffect(() => {
    const API = pokemonAPI + "/" + pokemon_name + "/";
    fetchNewPokemon(API);
  }, []);

  const fetchNewPokemon = async (url: string) => {
    try {
      const new_pokemon_response = await fetch(url);
      const new_pokemon_json = await new_pokemon_response.json();
      let sum = 0;
      new_pokemon_json.stats.forEach((statElement: stat) => {sum += statElement.base_stat;});
      const new_pokemon = {
        name: capatalizeFirst(new_pokemon_json.name),
        url: new_pokemon_json.url,
        id: new_pokemon_json.id,
        imgURL: new_pokemon_json.sprites.front_default,
        type: new_pokemon_json.types,
        stats: new_pokemon_json.stats,
        descriptionURL: new_pokemon_json.species.url,
        total_stat: sum
      }
      new_pokemon.stats[0].stat.name = "HP";
      setPokemon(new_pokemon);
      fetchPokemonDescription(new_pokemon_json.species.url);

    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchPokemonDescription = async (url: string) => {
    try {
      const description_response = await fetch(url);
      const description_json = await description_response.json();
      setDescription(description_json.flavor_text_entries[1].flavor_text);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="wrapper">
      <div className="detailed_card">
        <div className="basic-details">
          <label key="id" className="id-num">{"#" + currentPokemon.id}</label>
          <img
            className="poke-img"
            src={currentPokemon.imgURL}
            alt={"pokemon"}
          ></img>
          <p key="name" className="name">{capatalizeFirst(currentPokemon.name)}</p>
          <div className="types">
            {currentPokemon.type.map((typeElement: type) => {
              return (
                <>
                  <button
                    className={"type-button " + typeElement.type.name}
                    key={typeElement.type.name}
                  >
                    {capatalizeFirst(typeElement.type.name)}
                  </button>
                </>
              );
            })}
          </div>
        </div>
        <div className="more-details">
          <div className="description">
            <h3>Description</h3>
            <p>{description.replace(/[^a-zA-Z,.!?:'" é \\s \n]/g, "")}</p>
          </div>
          <div className="stats">
            <h3>stats</h3>
            <div className="stats-div">
              {currentPokemon.stats.map((statElement: stat, i) => {
                return (
                  <label
                    className="label-stat"
                    key={statElement.stat.name}
                  >
                    {capatalizeFirst(statElement.stat.name) +
                      ": " +
                      statElement.base_stat}
                  </label>
                );
              })}
              <label key="tot_stat" className="total-stat">
                {"Total: " + currentPokemon.total_stat}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
