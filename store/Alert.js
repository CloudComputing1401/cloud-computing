export const state = () => ({
    alert: false,
    text: '',
    type: 'success',
})

export const getters = {
    status(state) {
        return state.alert
    },
    text(state) {
        return state.text
    },
    type(state) {
        return state.type
    },
}

export const mutations = {
    change(state, value) {
        state.alert = value
    },
    setText(state, value) {
        state.text = value
    },
    setType(state, value) {
        state.type = value
    },
}

export const actions = {
    show({ commit }, data) {
        commit('change', true)
        if (typeof data === 'string') commit('setText', data)
        
        else {
            commit('setText', data.text)
            commit('setType', data.type)
        }
    },
}
