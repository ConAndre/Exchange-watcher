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
import { useToast } from 'vue-toastification';
import errorParser from '@/lib/errorParser';

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
      toast: useToast(),
      item: {},
      loaded: true,
    };
  },
  async mounted() {
    this.loaded = false;
    try {
      const { data } = await axios.get(`public/item/${this.id}`);
      this.item = data;
    } catch (error) {
      this.toast.error(`${errorParser(error)}`, { timeout: 3000 });
    }
    this.loaded = true;
  },
};
</script>

<style scoped>
.trends {
  color: gray;
}
</style>