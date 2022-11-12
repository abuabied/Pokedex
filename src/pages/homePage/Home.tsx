import { useState, useEffect } from "react";
import { LOAD_MORE_BUTTON, SEARCH_BUTTON, SHOW_ALL_BUTTON } from "../../constants/ButtonClasses";
import { pokemonAPI } from "../../constants/PokemonAPI";
import { Button } from "../../shared/button/Button";
import { SimpleCard } from "../../shared/card/SimpleCard/SimpleCard";
import { pokemonRawJson } from "../../types/PokemonObjectTypes";
import "./Home.css";

export const Home = () => {
  const [pokemonsList, setPokemonsList] = useState<pokemonRawJson[]>([]);
  const [allCurrentPokemons, setAllCurrentPokemons] = useState<
    pokemonRawJson[]
  >([]);
  const [filtered, setFiltered] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [nextUrl, setNextUrl] = useState("");

  useEffect(() => {
    const API: string = pokemonAPI;
    fetchNewPokemons(API);
  }, []);

  const fetchNewPokemons = async (url: string) => {
    try {
      const new_pokemons_response = await fetch(url);
      const new_pokemons_json = await new_pokemons_response.json();

      setAllCurrentPokemons([
        ...allCurrentPokemons,
        ...new_pokemons_json.results,
      ]);

      if (new_pokemons_json.next !== "") {
        setNextUrl(new_pokemons_json.next);
      } else {
        setNextUrl("");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const filterByName = () => {
    if (inputValue !== "") {
      setFiltered(true);
      let tmp: (pokemonRawJson | undefined)[] = allCurrentPokemons.map(
        (pokemon: pokemonRawJson) => {
          if (pokemon.name.toUpperCase().includes(inputValue.toUpperCase()))
            return pokemon;
        }
      );
      tmp = tmp.filter(el => el!==undefined);
      setPokemonsList(tmp as pokemonRawJson[]);
    } else {
      setFiltered(false);
    }
  };

  const loadMore = async () => {
    await fetchNewPokemons(nextUrl);
    filterByName();
  };

  return (
    <div className="home-div">
      <div className="search-sec">
        <input
          className="search-bar"
          type="text"
          placeholder="Search pokemon by name..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button button_class={SEARCH_BUTTON} onClick={filterByName} />
      </div>
      <div className="display-div">
        {filtered
          ? pokemonsList &&
            pokemonsList.map((pokemon) => (
              <SimpleCard
                key={pokemon.name}
                pokemon={pokemon}
              />
            ))
          : allCurrentPokemons &&
            allCurrentPokemons.map((pokemon) => (
              <SimpleCard
                key={pokemon.name}
                pokemon={pokemon}
              />
            ))}
      </div>
      <div className="button-sec">
        <div className="load-button">
          {nextUrl && (
            <Button button_class={LOAD_MORE_BUTTON} onClick={loadMore} />
          )}
        </div>
      </div>
    </div>
  );
};
