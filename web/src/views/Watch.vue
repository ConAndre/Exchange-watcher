<template>
  <div>
    <input
      type="text"
      name="search"
      id="search"
      placeholder="Search an item..."
      v-model.lazy="search"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
    };
  },
  computed,
};
</script>

<style>
</style>