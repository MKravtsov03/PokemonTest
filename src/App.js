import React from "react";
import "./App.scss";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Pokemon from "./Pokemon/Pokemon";
import FightLog from "./FightLog/FightLog";
import { Button } from "antd";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import styled from "styled-components";
import { updateFighter1HP, updateFighter2HP, selectFighter1, selectFighter2 } from "./store/actions";
import _ from "lodash";

const PokemonApp = styled.div`
  font-family: 'Oswald', sans-serif;
`;
const PokemonAppHeading = styled.div`
  position: fixed;
  left: calc(50% - 400px);
  top: 0;
  width: 100%;
  max-width: 800px;
  background: #fff;
  z-index: 5;
`;
const PokemonStage = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Logo = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;
const WinnerBlock = styled.div`
  text-align: center;
  font-size: 34px;
  text-transform: uppercase;
  font-weight: 700;
  color: rgb(252, 48, 22);
  margin-bottom: 20px;
`;

const GET_POKEMONS = gql`
{
  pokemons(first: 20) {
    id
    number
    name
    maxHP
    image
    resistant
    attacks {
      fast {
        name
        type
        damage
      }
      special {
        name
        type
        damage
      }
    }
  }
}
`;
type Props = {
  fighter1: Object,
  fighter1: Object,
  fighter1HP: Number,
  fighter2HP: Number,
  selectFighter1: Function,
  selectFighter2: Function,
  updateFighter1HP: Function,
  updateFighter2HP: Function
}
type State = {
  fighter1: Number,
  fighter2: Number,
  fightEnded: Boolean,
  fightInProcess: Boolean,
  attacksList: Array,
  winner: String
}

class App extends React.Component<Props, State> {
  state = {
    fighter1: 1,
    fighter2: 2,
    fightEnded: false,
    fightInProcess: false,
    attacksList: [],
    winner: ""
  }
  startFight = () => {
    this.setState({
      fightInProcess: true
    });
    let fighter1Turns;
    let fighter2Turns;

    fighter1Turns = setTimeout(() => {
      if (!this.state.fightEnded) {
        this.fighter1Attack();
        if (!this.state.fightEnded) {
          fighter2Turns = setTimeout(() => {
            this.fighter2Attack();
          }, 500);
        } else {
          clearTimeout(fighter2Turns);
        }
        setTimeout(this.startFight, 500);
      } else {
        clearTimeout(fighter1Turns);
      }
    }, 1000);
  }
  attackFunction = (attacker, deffender) => {
    const attacks = attacker.attacks.special.concat(attacker.attacks.fast);
    const doneAttacks = this.state.attacksList;
    const currentAttack = _.sample(attacks);
    let currentDamage;
    const attackType = currentAttack.type;
    const { resistant } = deffender;
    const isResistant = resistant.some(resist => attackType.indexOf(resist) >= 0);

    if (isResistant) {
      currentAttack.damage = 0;
      currentDamage = currentAttack.damage;
    } else {
      currentDamage = currentAttack.damage * 6;
    }
    currentAttack.multiplyDmg = currentDamage;
    doneAttacks.push(currentAttack);
    this.setState({
      attacksList: doneAttacks
    });
    return currentDamage;
  }
  fighter1Attack = () => {
    const damage = this.attackFunction(this.props.fighter1, this.props.fighter2);

    if (this.props.fighter2HP - damage < 0) {
      this.props.updateFighter2HP(0);
      this.setState({
        fightEnded: true,
        winner: this.props.fighter1.name
      });
    } else {
      this.props.updateFighter2HP(this.props.fighter2HP - damage);
    }
  }
  fighter2Attack = () => {
    const damage = this.attackFunction(this.props.fighter2, this.props.fighter1);

    if (this.props.fighter1HP - damage < 0) {
      this.props.updateFighter1HP(0);
      this.setState({
        fightEnded: true,
        winner: this.props.fighter2.name
      });
    } else {
      this.props.updateFighter1HP(this.props.fighter1HP - damage);
    }
  }
  checkFighters = () => {
    const { fighter1, fighter2 } = this.props;

    return (fighter1.hasOwnProperty("id") && fighter2.hasOwnProperty("id"));
  }
  restart = () => {
    this.props.updateFighter1HP(this.props.fighter1.maxHP);
    this.props.updateFighter2HP(this.props.fighter2.maxHP);
    this.setState({
      attacksList: [],
      winner: "",
      fightEnded: false,
      fightInProcess: false
    });
  }
  render() {
    return (
      <Query query={GET_POKEMONS}>
        {({ data: { pokemons }, loading }) => {
          if (loading || !pokemons) {
            return <div className="pokemons-loader"><img src="./data/loader.gif" /></div>;
          }
          return (
            <PokemonApp>
              <PokemonAppHeading>
                <Logo>
                  <img src="./data/logo.jpeg" width="150" alt="" />
                </Logo>
                <PokemonStage>
                  <Pokemon data={pokemons} fightProcess={this.state.fightInProcess} currentHP={this.props.fighter1HP} fighter={this.state.fighter1} />
                  <Pokemon data={pokemons} fightProcess={this.state.fightInProcess} currentHP={this.props.fighter2HP} fighter={this.state.fighter2} />
                </PokemonStage>
                <WinnerBlock>
                  {this.state.winner ? `${this.state.winner} WINS` : ""}
                </WinnerBlock>
                <Button type="danger" onClick={this.startFight} className="fight-btn" disabled={!this.checkFighters() || this.state.fightInProcess}>Fight</Button>
                {
                  this.state.fightEnded ? <Button type="primary" onClick={this.restart} className="restart-btn">Play again</Button> : ""
                }
              </PokemonAppHeading>
              <FightLog fighter1={this.props.fighter1} fighter2={this.props.fighter2} attacks={this.state.attacksList}></FightLog>
            </PokemonApp>
          );
        }}
      </Query>
    );
  }
}

const mapStateToProps = state => ({
  fighter1: state.mainState.fighter1,
  fighter2: state.mainState.fighter2,
  fighter1HP: state.mainState.fighter1HP,
  fighter2HP: state.mainState.fighter2HP
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


export default connect(mapStateToProps, mapDispatchToProps)(App);
