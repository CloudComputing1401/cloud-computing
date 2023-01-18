export const state = () => ({
  userFirstName: "",
  userLastName: "",
  activeUser: false,
});

export const getters = {
  getUserFirstName(state) {
    return state.userFirstName;
  },
  getUserLastName(state) {
    return state.userLastName;
  },
  getActiveUser(state) {
    return state.activeUser;
  },
};

export const mutations = {
  setUserFirstName(state, value) {
    state.userFirstName = value;
  },
  setUserLastName(state, value) {
    state.userLastName = value;
  },
  setActiveUser(state, value) {
    state.activeUser = value;
  },
};
