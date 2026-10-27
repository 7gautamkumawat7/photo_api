export const favouritesReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_FAVOURITE": {
      const id = action.payload;
      if (state.includes(id)) {
        return state.filter((favId) => favId !== id);
      } else {
        return [...state, id];
      }
    }
    default:
      return state;
  }
};
