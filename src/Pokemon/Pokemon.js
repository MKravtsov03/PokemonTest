import React from "react";
import { connect } from "react-redux";
import { selectFighter1, selectFighter2, updateFighter1HP, updateFighter2HP } from "../store/actions";
import PokemonSelect from "../PokemonsSlect/PokemonsSelect";
import PokemonInfo from "./PokemonInfo";
import styled from "styled-components";

const PokemonItem = styled.div`
  width: 49%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type Props = {
  fighter1: Object,
  fighter1: Object,
  selectFighter1: Function,
  selectFighter2: Function,
  updateFighter1HP: Function,
  updateFighter2HP: Function
}
type State = {
  selectedPokemon: Object,
  pokemonCurrentHP: Number,
}

class Pokemon extends React.Component<Props, State> {
  state = {
    selectedPokemon: {},
    pokemonCurrentHP: 0
  }
  handleChange = value => {
    this.props.data.forEach(item => {
      if (item.name === value) {
        if (this.props.fighter === 1) {
          this.setState({
            selectedPokemon: item
          }, () => this.props.selectFighter1(this.state.selectedPokemon), this.props.updateFighter1HP(item.maxHP));
        } else {
          this.setState({
            selectedPokemon: item,
            pokemonCurrentHP: item.maxHP
          }, () => this.props.selectFighter2(this.state.selectedPokemon), this.props.updateFighter2HP(item.maxHP));
        }
      }
    });
  }
  render() {
    return (
      <PokemonItem>
        <PokemonInfo currentHP={this.props.currentHP} pokemon={this.state.selectedPokemon} />
        <PokemonSelect fightProcess={this.props.fightProcess} handleChange={this.handleChange} pokemons={this.props.data} />
      </PokemonItem>
    );
  }
}


const mapStateToProps = state => ({
  fighter1: state.mainState.fighter1,
  fighter2: state.mainState.fighter2
});

const mapDispatchToProps = dispatch => ({
  selectFighter1: pokemon => {
    dispatch(selectFighter1(pokemon));
  },
  selectFighter2: pokemon => {
    dispatch(selectFighter2(pokemon));
  },
  updateFighter1HP: hp => {
    dispatch(updateFighter1HP(hp));
  },
  updateFighter2HP: hp => {
    dispatch(updateFighter2HP(hp));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Pokemon);
