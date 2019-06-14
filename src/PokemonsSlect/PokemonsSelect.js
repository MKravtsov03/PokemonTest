import React from "react";
import { Select } from "antd";
import "antd/dist/antd.css";
import "./pokemon-select.css";

const { Option } = Select;

type Props = {
  pokemons: Array,
  fightProcess: Boolean,
  handleChange: Function
}

const PokemonSelect = (props: Props) => {
  const { pokemons, fightProcess, handleChange } = props;

  return (
    <Select disabled={fightProcess} onChange={handleChange}>
      {
        pokemons.map(pokemon => <Option key={pokemon.id} value={pokemon.name}>{pokemon.name}</Option>)
      }
    </Select>
  );
};


export default PokemonSelect;
