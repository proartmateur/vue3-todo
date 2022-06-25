<template>
  <div>
    <h1>My First TODO Vue 3</h1>
    <input type="text" v-model="name" @keyup.enter="add" />
    <button @click="add">+</button>
    <br />

    <h3>Done: {{ todos_completed }} / {{ todos_total }}</h3>
    <ul style="display: flex; flex-direction: column">
      <template v-for="(item, index) in todos" :key="index">
        <li>
          <ToDoItem
            :id="index"
            :item="item"
            :idx="index"
            @deleteItem="itemDeleted"
            @completeItem="itemCompleted"
            @changeMinutes="itemMinutesChanged"
          ></ToDoItem>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
import { ref } from 'vue';
import useTodos from './useTodos.js';
import ToDoItem from './ToDoItem.vue';
export default {
  name: 'ToDo',
  components: { ToDoItem },
  setup() {
    const name = ref('');

    const {
      todos,
      todos_total,
      todos_completed,
      addTodo,
      deleteTodo,
      completeTodo,
      changeTodoMinutes,
    } = useTodos();

    return {
      todos,
      todos_total,
      todos_completed,
      name,
      add: () => {
        if (name.value !== '') {
          addTodo({ name: name.value });
          name.value = '';
        }
      },
      itemDeleted: (idx) => {
        deleteTodo(idx);
      },
      itemCompleted: (idx) => {
        completeTodo(idx);
      },
      itemMinutesChanged: (item) => {
        changeTodoMinutes(item);
      },
    };
  },
};
</script>
