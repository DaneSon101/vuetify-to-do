<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app :mobile-breakpoint="768">
      <v-img
        src="../src/assets/bgappbar.jpg"
        gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
        height="170"
        class="pa-6"
      >
      <v-avatar class="mb-2">
      <img
        src="https://cdn.vuetifyjs.com/images/john.jpg"
        size="70px"
        alt="John"
      >
    </v-avatar>
    <div class="white--text text-subtitle-1 font-weight-bold"
    >Name
    </div>
    <div class="white--text text-subtitle-2">
      Surname
      </div>
      </v-img>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>-->
    <v-app-bar app color="primary" dark prominent :height="$route.path === '/' ? '238' : '170'" src="./assets/bgappbar.jpg">
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(55,236,186,.9), rgba(25,32,72,.9)"
        ></v-img>
      </template>

      <v-container class="header-container pa-0">
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <search/>
        </v-row>
        <v-row>
          <v-toolbar-title class="ml-4 text-h4">
            {{ $store.state.appTitle }}
          </v-toolbar-title>
        </v-row>
        <v-row>
        <live-date/>
        </v-row>
        <v-row v-if="$route.path === '/'">
          <field-add-task />
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <snack-bar />
    </v-main>
  </v-app>
</template>

<script>
import LiveDatesAndTime from './components/Tools/LiveDatesAndTime.vue';
export default {
  components: {
    "snack-bar": require("./components/shared/snackBar").default,
    "search": require("./components/Tools/Search").default,
    "live-date": require("./components/Tools/LiveDatesAndTime").default,
    "field-add-task": require("./components/todo/FieldAddTask").default
  },
  data() {
    return {
      drawer: null,
      items: [
        { title: "Todo", icon: "mdi-view-dashboard", to: "/" },
        { title: "About", icon: "mdi-help-box", to: "/about" }
      ],
      right: null
    };
  },
  mounted() {
    //console.log(this.$route)
    this.$store.dispatch('getTasks')
  }
};
</script>

<style lang="css">
.header-container {
  max-width :none !important;
}
</style>
