<template>
  <div class="btn btn-secondary btn-outline IconButton">
    <div class="btn-icon">
      <i class="icon-arrow-right" />
    </div>
    <span
      class="btn-text"
      v-text="text"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    default: '',
  },

  text: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.IconButton {
  .btn-icon {
    font-size: 2.4rem;
  }
}
</style>
