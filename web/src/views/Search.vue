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
        <div v-if="!!search">
          <div v-if="searchReady && hasItems" class="container w-100">
            <router-link
              :to="`/item/${i.id}`"
              class="row item-row"
              v-for="i in getStateItems(searchLowerCase)"
              :key="i"
            >
              <div class="col">{{ i.name }} ${{ $filters.monetize(i.price) }}</div>
              <div class="col item-examine">{{ i.examine }}</div>
            </router-link>
          </div>
          <div v-else-if="!searchReady"><h2>Too many results to display...</h2></div>
          <div v-else-if="searchReady && !hasItems"><h2>No results found...</h2></div>
        </div>
        <div v-else><h2>Search for an item...</h2></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

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
    searchReady() {
      return this.search.length > 2;
    },
    searchLowerCase() {
      return this.search.toLowerCase();
    },
    hasItems() {
      return !!this.getStateItems(this.search.toLowerCase()).length;
    },
  },
};
</script>

<style scoped>
.item-row {
  overflow-x: auto;
  max-height: 55px;
}
.item-row:hover {
  background: #1e1e1e !important;
}
.item-examine:hover {
  color: white;
}
</style>