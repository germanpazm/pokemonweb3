import { createStore } from 'vuex';

const store = createStore({
  state: {
    userAccount: null,
    actualizar: false,
    transactionesHashes: [] // Variable global como un array vacío
  },
  mutations: {
    setUserAccount(state, account) {
      state.userAccount = account;
    },
    setActualizar(state, value) {
      state.actualizar = value;
    },
    agregarTransactionHash(state, hash) {
      state.transactionesHashes.push(hash);
    }
  },
  actions: {
    updateUserAccount({ commit }, account) {
      commit('setUserAccount', account);
    },
    updateActualizar({ commit }, value) {
      commit('setActualizar', value);
    },
    addTransactionHash({ commit }, hash) {
      commit('agregarTransactionHash', hash);
    }
  },
  getters: {
    getUserAccount(state) {
      return state.userAccount;
    },
    getActualizar(state) {
      return state.actualizar;
    },
    getTransactionHashes(state) {
      return state.transactionesHashes;
    }
  }
});

export default store;
