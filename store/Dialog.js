export const state = () => ({
  dialogName: "",
  machineData: {
    name: "",
    id: "",
  },
});

export const getters = {
  active(state) {
    return state.dialogName;
  },
  getMachineData(state) {
    return state.machineData;
  },
};

export const mutations = {
  setDialogName(state, value) {
    state.dialogName = value;
  },
  setMachineData(state, value) {
    state.machineData.name = value.name;
    state.machineData.id = value.id;
  },
};

export const actions = {
  async showDialog({ commit }, data) {
    if (typeof data === "string") {
      commit("setDialogName", data);
      commit("setMachineData", {});
    } else {
      await commit("setMachineData", data.data);
      commit("setDialogName", data.name);
    }
  },
};
