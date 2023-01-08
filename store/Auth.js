export const state = () => ({
  token: null,
  refreshToken: null,
  withoutBearerToken: null,
});

export const getters = {
  getToken(state) {
    return state.token;
  },
  getRefreshToken(state) {
    return state.refreshToken;
  },
  getWithoutBearerToken(state) {
    return state.withoutBearerToken;
  },
};

export const mutations = {
  setToken(state, value) {
    // state.withoutBearerToken = value
    state.token = `Bearer ${value}`;
  },
  setRefreshToken(state, value) {
    state.refreshToken = `${value}`;
  },
  clear(state) {
    state.withoutBearerToken = null;
    state.refreshToken = null;
    state.token = null;
  },
};

export const actions = {
  store({ commit }, store) {
    commit("setToken", store.token);
  },
};
