import Vue from "vue";
import Vuex from "vuex";

import Localbase from 'localbase'

let db = new Localbase('db')

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    tasks: [
      // {
      //   id: 1,
      //   title: "get fucked",
      //   done: false,
      //   dueDate: "2020-10-26"
      // },
      // {
      //   id: 2,
      //   title: "hello",
      //   done: false,
      //   dueDate: "2020-10-30"
      // },
      // {
      //   id: 3,
      //   title: "hey",
      //   done: false,
      //   dueDate: ""
      // }
    ],
    snackBar: {
      show: false,
      text: ""
    },
    sorting: false
    //data
  },
  mutations: {
    setSearch(state, value) {
      // console.log('value: ', value)
      state.search = value
    },
    //methods change the data in the state (commit mutation)
    addTask(state, newTask) {
      state.tasks.push(newTask);
    },
    doneTask(state, id) {
      let task = state.tasks.filter(task => task.id === id)[0];
      task.done = !task.done;
    },
    updateTaskTitle(state, payload) {
      let task = state.tasks.filter(task => task.id === payload.id)[0];
      task.title = payload.title;
    },
    updateTaskDueDate(state, payload) {
      let task = state.tasks.filter(task => task.id === payload.id)[0];
      task.dueDate = payload.dueDate;
    },
    setTasks(state, tasks) {
      // console.log('tasks: ', tasks)
      state.tasks = tasks
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id);
    },
    showSnackBar(state, text) {
      let timeout = 0;
      if (state.snackBar.show) {
        state.snackBar.show = false;
        timeout = 300;
      }
      setTimeout(() => {
        state.snackBar.show = true;
        state.snackBar.text = text;
      }, timeout);
    },
    hideSnackBar(state) {
      state.snackBar.show = false;
    },
    toggleSorting(state) {
      state.sorting = !state.sorting
    }
  },
  actions: {
    //api calls are done here (dispatch actions)
    addTask({ commit }, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null
      };
      db.collection('tasks').add(newTask).then(() => {
        commit("addTask", newTask);
      commit("showSnackBar", "Added");
      })
    },
    doneTask({ state, commit }, id) {
      let task = state.tasks.filter(task => task.id === id)[0];
      db.collection('tasks').doc({ id: id }).update({
        done: !task.dane
      }).then(() => {
        commit('doneTask', id)
      })
    },
    deleteTask({ commit }, id) {
      db.collection('tasks').doc({ id: id }).delete().then(() => {
        commit("deleteTask", id);
      commit("showSnackBar", "Deleted");
      })
    },
    updateTaskTitle({ commit }, payload) {
      db.collection('tasks').doc({id: payload.id}).update({
        title: payload.title
      }).then(() => {
        commit("updateTaskTitle", payload);
        commit("showSnackBar", "Updated");
      })
    },
    updateTaskDueDate({ commit }, payload) {
      db.collection('tasks').doc({id: payload.id }).update({
        dueDate: payload.dueDate
      }).then(() => {
        commit("updateTaskDueDate", payload);
      commit("showSnackBar", "Due Date Updated");
      })
    },
    setTasks({ commit }, tasks) {
      db.collection('tasks').set(tasks)
        commit('setTasks', tasks)
    },
    getTasks({commit}) {
      db.collection('tasks').get().then(tasks => {
      commit('setTasks', tasks)
    })
    }
  },
  getters: {
    //get data from the state get or filter before showing data
    tasksFilters(state){
      if(!state.search) {
        return state.tasks
      }
      return state.tasks.filter(task => task.title.toLowerCase().includes(state.search.toLowerCase()))
    }
  }
});
