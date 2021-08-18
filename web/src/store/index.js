import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';
import { Items } from 'oldschooljs';
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default createStore({
  state: {
    items: {},
    loaded: false,
    data: { key: 'default' }
  },
  mutations: {
    commitData(state, data) {
      state.data = JSON.parse(JSON.stringify(data));
    },
    commitItems(state) {
      if (state.loaded) return;
      let itemsArray = Array.from(Items);
      itemsArray = itemsArray.map(array => array.pop());
      state.items = itemsArray.map(item => {
        return { name: item.name, examine: item.examine, price: item.price, id: item.id };
      });
      state.loaded = true;
    },
  },
  actions: {
    loadItems({ commit }) {
      commit('commitItems');
    },
    setData({ commit }, data) {
      commit('commitData', data);
    },
  },
  modules: {},
  plugins: [vuexLocal.plugin],
  getters: {
    getStateKey: (state) => (key) => state[key],
    getStateItems: (state) => (key) => {
      if (key.length <= 2) return [];
      return state.items.filter(item => item.name.toLowerCase().includes(key));
    }
  },
});