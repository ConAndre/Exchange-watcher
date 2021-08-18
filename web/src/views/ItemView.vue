<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-2"><item-card :item="item" /></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ItemCard from '@/components/ItemCard.vue';

export default {
  name: 'itemView',
  props: {
    id: { type: String, default: '' },
  },
  components: {
    ItemCard,
  },
  data() {
    return {
      item: {},
      loaded: true,
    };
  },
  async mounted() {
    this.loaded = false;
    const { data } = await axios.get(`public/item/${this.id}`);
    this.item = data;
    this.loaded = true;
  },
};
</script>

<style scoped>
.trends {
  color: gray;
}
</style>