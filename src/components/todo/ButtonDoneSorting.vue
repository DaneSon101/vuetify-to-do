<template>
  <v-btn @click="$store.commit('toggleSorting')" color="primary" class="button-sorting-done">Done Sorting</v-btn>
</template>

<script>
export default {

}
</script>

<style>
.button-sorting-done {
  position: fixed;
  bottom: 20px;
  left:50%;
  transform: translateX(50%);
}
</style>