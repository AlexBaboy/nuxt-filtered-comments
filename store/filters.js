const state = () => ({
  activeFilter: {}
})

// getters
const getters = {
  activeFilterStore: state => state.activeFilter
}

// actions
const actions = {
  changeFilterStore ({ commit, state }, filterObject) {
    commit('CHANGE_FILTER', filterObject)
  }
}

// mutations
const mutations = {
  CHANGE_FILTER (state, payload) {
    state.activeFilter = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
