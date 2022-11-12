export interface type {
  slot?: number;
  type: { name: string; url?: string };
};

export interface stat {
  base_stat: number;
  effort?: number;
  stat: { name: string; url?: string };
};

export interface pokemonDetailed {
  name: string;
  url: string;
  id?: string;
  imgURL?: string;
  type?: type[];
  stats?: stat[];
  total_stat?: number;
  descriptionURL:string;
};

export interface pokemonRawJson {
  name: string;
  url: string;
  descriptionURL: string;
}

export interface pokemonListRawJson {
  results: pokemonRawJson[];
  nextURL: string;
}
