<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <MDBInput label="Search an item..." @change="updateRoute" />
      <div class="row mt-5">
        <div v-if="!!search">
          <div v-if="searchReady && hasItems" class="container w-100">
            <MDBTable>
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Item</th>
                  <th scope="col">Examine</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="i in getStateItems(searchLowerCase)" :key="i" @click="viewId(i.id)">
                  <th scope="row">{{ i.id }}</th>
                  <td>{{ i.name }}</td>
                  <td>{{ i.examine }}</td>
                </tr>
              </tbody>
            </MDBTable>
            <!-- <div class="col">{{ i.name }} ${{ $filters.monetize(i.price) }}</div>
            <div class="col item-examine">{{ i.examine }}</div> -->
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
import { MDBInput, MDBTable } from 'mdb-vue-ui-kit';
export default {
  name: 'search',
  components: { MDBInput, MDBTable },
  props: {
    search: { type: String, default: '' },
  },
  mounted() {
    this.loadItems();
  },
  methods: {
    ...mapActions(['loadItems']),
    viewId(id) {
      this.$router.push(`/item/${id}`);
    },
    updateRoute(e) {
      this.$router.replace({ query: { ...this.$router.query, search: e.target.value } });
    },
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
tbody tr:hover {
  color: #fc5404;
  cursor: pointer;
}
</style>