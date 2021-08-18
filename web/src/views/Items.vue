<template>
  <div>
    <h2>Items</h2>
    <select>
      <option :style="color(i[1].price)" v-for="i in tradeableItems" :key="i">
        {{ i[1].name }} ${{ $filters.monetize(i[1].price) }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'items',
  data() {
    return {
      items: this.ITEMS,
    };
  },
  computed: {
    tradeableItems() {
      return this.items.filter((item) => item.tradeable_on_ge);
    },
  },
  methods: {
    color(i) {
      const BG = 'background-color: #';
      let color;
      if (!i) color = '#9d9d9d';
      else if (i < 10000) color = '9d9d9d';
      else if (i < 100000) color = 'ffffff';
      else if (i < 300000) color = '1eff00';
      else if (i < 600000) color = '0070dd';
      else if (i < 1000000) color = 'a335ee';
      else if (i < 3000000) color = 'ff8000';
      else if (i < 30000000) color = 'e6cc80';
      else color = '00ccff';

      return BG + color;
    },
  },
};
</script>

<style>
</style>