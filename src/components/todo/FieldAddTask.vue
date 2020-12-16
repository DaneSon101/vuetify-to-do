<template>
  <v-text-field
    v-model="newTaskTitle"
    outlined
    placeholder="Add task"
    class="field-add-task pa-3"
    hide-details
    clearable
    @keyup.enter="addTask"
  >
    <template v-slot:append>
      <v-icon @click="addTask" :disabled="newTaskTitleInvalid">mdi-plus</v-icon>
    </template>
  </v-text-field>
</template>

<script>
export default {
  data() {
    return {
      newTaskTitle: ""
    };
  },
  methods: {
    addTask() {
      if (!this.newTaskTitleInvalid) {
        this.$store.dispatch("addTask", this.newTaskTitle);
        this.newTaskTitle = "";
      }
    }
  },
  computed: {
    newTaskTitleInvalid() {
      return !this.newTaskTitle;
    }
  }
};
</script>

<style>
.field-add-task.v-input--is-focused .v-input__slot {
  background: rgba(28,69,88,1) !important;
}
</style>
