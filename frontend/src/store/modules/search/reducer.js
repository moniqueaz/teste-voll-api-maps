export default function map(
  state = { location: { lat: "", lng: "" } },
  action
) {
  switch (action.type) {
    case "MOUNT_TO_SEARCH":
      return {
        ...state,
        search: action.search,
      };
    default:
      return state;
  }
}
