export const state = () => ({
  dialogName: "",
  data: "",
});

export const getters = {
  active(state) {
    return state.dialogName;
  },
  getData(state) {
    return state.data;
  },
};

export const mutations = {
  setDialogName(state, value) {
    state.dialogName = value;
  },
  setData(state, value) {
    state.data = value;
  },
};

export const actions = {
  async showDialog({ commit }, data) {
    if (typeof data === "string") {
      commit("setDialogName", data);
      commit("setData", {});
    } else {
      await commit("setData", data.data);
      commit("setDialogName", data.name);
    }
  },
};
