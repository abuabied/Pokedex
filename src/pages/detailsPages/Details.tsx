import { useParams } from "react-router-dom";
import { DETAILED_CARD } from "../../constants/CardClasses";
import { pokemonAPI } from "../../constants/PokemonAPI";
import { DetailedCard } from "../../shared/card/DetailedCard/DetailedCard";

export const Details = () => {
const { pokemon } = useParams();
let name: string = pokemon as string;
let url = pokemonAPI + "/" + name + "/";
    return (
      <DetailedCard
        pokemon={{
          name: name,
          url: url,
          descriptionURL: "",
        }}
      />
    );

};
