export function mountToCards(cards) {
  return {
    type: "MOUNT_TO_CARDS",
    cards,
  };
}

export function mountToLocation(location) {
  return {
    type: "MOUNT_TO_LOCATION",
    location,
  };
}

export function mountToSearch(search) {
  return {
    type: "MOUNT_TO_SEARCH",
    search,
  };
}
