<template>
  <v-text-field
  :value="$store.state.search"
  @input="$store.commit('setSearch', $event)"
  @focus="searchClosed = false"
  @blur="searchClosed = true"
  :disabled="$store.state.sorting"
    class="expanding-search mt-1"
    :class="{ 'closed' : searchClosed && !$store.state.search }"
    placeholder="Search"
    filled
    dense
    clearable
    prepend-inner-icon="mdi-magnify"
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      searchClosed: true,
    };
  }
};
</script>

<style lang="css">
.theme--dark.v-text-field > .v-input__control > .v-input__slot:before {
    border-color: transparent !important;
}
.v-text-field.v-input__control.v-input__slot:after {
    background-color: transparent;
    border-color: transparent;
    border-style: none;
    border-width: 0;
    transform: none;
}

.expanding-search {
  transition: 0.5s;
}

.v-input__slot {
  background: transparent !important;
  cursor: pointer !important;
}

.expanding-search.closed {
  max-width: 45px;
}

</style>
