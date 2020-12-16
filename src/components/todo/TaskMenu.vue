<template>
  <div>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn light color="primary" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="handleClick(i)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <dialog-edit
      v-if="dialogs.edit"
      :task="task"
      @close="dialogs.edit = false"
    />
    <dialog-delete
      v-if="dialogs.delete"
      :task="task"
      @close="dialogs.delete = false"
    />
    <dialog-due-date
      v-if="dialogs.dueDate"
      :task="task"
      @close="dialogs.dueDate = false"
    />
  </div>
</template>

<script>
export default {
  components: {
    "dialog-edit": require("../todo/dialogs/DialogEdit").default,
    "dialog-delete": require("../todo/dialogs/DialogDelete").default,
    "dialog-due-date": require("../todo/dialogs/DialogDueDate").default
  },
  props: ["task"],
  data() {
    return {
      dialogs: {
        delete: false,
        edit: false,
        dueDate: false
      },
      items: [
        {
          title: "Edit",
          icon: "mdi-pencil",
          click() {
            this.dialogs.edit = true;
          }
        },
        {
          title: "Due Date",
          icon: "mdi-calendar-range",
          click() {
            this.dialogs.dueDate = true;
          }
        },
        {
          title: "Delete",
          icon: "mdi-trash-can-outline",
          click() {
            this.dialogs.delete = true;
          }
        },
        {
          title: "Sorting",
          icon: "mdi-drag-horizontal-variant",
          click() {
            if (!this.$store.state.search) {
               this.$store.commit('toggleSorting')
            }
            else{
              this.$store.commit('showSnackBar', 'fuck off')
            }
          }
        }
      ]
    };
  },
  methods: {
    handleClick(i) {
      this.items[i].click.call(this);
    }
  }
};
</script>

<style></style>
