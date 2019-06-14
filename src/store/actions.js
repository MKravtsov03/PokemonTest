const SELECT_FIGHTER1 = "SELECT_FIGHTER1";
const SELECT_FIGHTER2 = "SELECT_FIGHTER2";
const UPDATE_FIGHTER1_HP = "UPDATE_FIGHTER1_HP";
const UPDATE_FIGHTER2_HP = "UPDATE_FIGHTER2_HP";

export const selectFighter1 = pokemon => ({
  type: SELECT_FIGHTER1,
  payload: pokemon
});
export const selectFighter2 = pokemon => ({
  type: SELECT_FIGHTER2,
  payload: pokemon
});
export const updateFighter1HP = hp => ({
  type: UPDATE_FIGHTER1_HP,
  payload: hp
});
export const updateFighter2HP = hp => ({
  type: UPDATE_FIGHTER2_HP,
  payload: hp
});
