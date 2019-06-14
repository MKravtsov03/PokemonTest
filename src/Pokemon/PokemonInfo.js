import React from "react";
import styled from "styled-components";
import { Progress } from "antd";

const PokemonItemInfo = styled.div`
  width: 100%;
  text-align: center;
`;
const PokemonItemHealth = styled.div`
  margin-bottom: 15px;
  text-align: center;
  font-size: 20px;
`;
const PokemonItemThumb = styled.div`
  margin: 0 auto 15px;
  height: 120px;
  width: 120px;
  background-image: url(data/ball.png);
  background-position: center;
  background-size: cover;
`;
const PokemonItemName = styled.div`
  font-size: 24px;
  font-weight: 700;
  height: 36px;
  margin-bottom: 20px;
`;

type Props = {
  pokemon: Object,
  currentHP: Number
}
const PokemonInfo = (props: Props) => {
  const { pokemon, currentHP } = props;

  return (
    <PokemonItemInfo>
      <PokemonItemHealth>
        {currentHP}
        <Progress percent={(currentHP / pokemon.maxHP) * 100} showInfo={false}/>
      </PokemonItemHealth>
      <PokemonItemThumb>
        <img src={pokemon.image} width="120" height="120" alt={pokemon.name} />
      </PokemonItemThumb>
      <PokemonItemName>
        {pokemon.name}
      </PokemonItemName>
    </PokemonItemInfo>
  );
};

export default PokemonInfo;
