<template>
  <div id="app">
    <h1 class="ui dividing centered header">Vue.js Todo App</h1>
    <div class='ui three column centered grid'>
      <div class='column'>
        <todo-list v-bind:todos="todos"></todo-list>
        <create-todo v-on:create-todo="createTodo"></create-todo>
      </div>
    </div>
  </div>
</template>

<script type = "text/javascript" >

import sweetalert from 'sweetalert';
import TodoList from './components/TodoList';
import CreateTodo from './components/CreateTodo';

export default {
  name: 'app',
  components: {
    TodoList,
    CreateTodo,
  },
  data() {
    this.$http.get('https://1e04g3gxw7.execute-api.eu-west-1.amazonaws.com/Prod/todos').then((response) => {
      this.todos = response.body;
    });

    return {
      todos: this.todos,
    };
  },
  methods: {
    createTodo(newTodo) {
      this.todos.push(newTodo);
      this.$http.post('https://1e04g3gxw7.execute-api.eu-west-1.amazonaws.com/Prod/todos/', {
        name: newTodo.name,
      });
      sweetalert('Success!', 'To-Do created!', 'success');
    },
  },
};
</script>
<style>
</style>