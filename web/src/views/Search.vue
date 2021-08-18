<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-3">
        <input
          class="form-control"
          type="text"
          name="search"
          id="search"
          placeholder="Search an item..."
          v-model.lazy="search"
        />
      </div>
      <div class="row mt-5">
        <div v-if="searchReady" class="container w-75">
          <router-link
            :to="`/item/${i.id}`"
            class="row item-row"
            v-for="i in getStateItems(searchLowerCase)"
            :key="i"
          >
            <div class="col">{{ i.name }} ${{ $filters.monetize(i.price) }}</div>
            <div class="col overflow-x">{{ i.examine }}</div>
          </router-link>
        </div>
        <div v-else><h2>Too many results to display...</h2></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  name: 'search',
  data() {
    return {
      search: '',
    };
  },
  mounted() {
    this.loadItems();
  },
  methods: {
    ...mapActions(['loadItems']),
  },
  computed: {
    ...mapGetters(['getStateItems']),
    ...mapState({
      items: (state) => state.items,
    }),
    searchReady() {
      return this.search.length > 2;
    },
    searchLowerCase() {
      return this.search.toLowerCase();
    },
  },
};
</script>

<style scoped>
.item-row {
  background-color: bisque;
  margin-top: 0.25em;
}
</style>