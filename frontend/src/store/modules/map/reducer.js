export default function map(
  state = {
    cards: [],
    locations: [],
  },
  action
) {
  switch (action.type) {
    case "MOUNT_TO_CARDS":
      return {
        ...state,
        cards: action.cards,
      };
    case "MOUNT_TO_LOCATION":
      return {
        ...state,
        locations: action.location,
      };
    default:
      return state;
  }
}
