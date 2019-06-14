const initialState = {
  fighter1: {},
  fighter2: {},
  fighter1HP: 0,
  fighter2HP: 0
};

export const mainState = (state = initialState, action) => {
  switch (action.type) {
  case "SELECT_FIGHTER1":
    return {
      ...state,
      fighter1: action.payload
    };
  case "SELECT_FIGHTER2":
    return {
      ...state,
      fighter2: action.payload
    };
  case "UPDATE_FIGHTER1_HP":
    return {
      ...state,
      fighter1HP: action.payload
    };
  case "UPDATE_FIGHTER2_HP":
    return {
      ...state,
      fighter2HP: action.payload
    };
  default:
    return state;
  }
};
