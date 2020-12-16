<template>
  <div class="home">
    <list-task v-if="$store.state.tasks.length" />
    <no-tasks v-else />
    <button-sorting-done v-if="$store.state.sorting"/>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {
    "list-task": require("../components/todo/ListOfTasks").default,
    "no-tasks": require("../components/todo/NoTasks").default,
    "button-sorting-done": require("../components/todo/ButtonDoneSorting").default
  }
};
</script>
