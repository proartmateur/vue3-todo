import { computed, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const useTodos = () => {
  const todos = ref([]);

  function addTodo({ name }) {
    todos.value.push({
      name: name,
      is_completed: false,
      id: uuidv4(),
      minutes: 0,
    });
  }

  function deleteTodo(idx) {
    const nt = todos.value.filter((x) => x.id !== idx);
    todos.value = nt;
  }

  function completeTodo(item) {
    const { id, idx, is_completed } = item;
    todos.value[idx].is_completed = is_completed;
  }

  function changeTodoMinutes(item) {
    const { id, idx, minutes } = item;
    todos.value[idx].minutes = minutes;
  }

  const todos_total = computed(() => todos.value.length);
  const todos_completed = computed(() => {
    const completed = todos.value.filter((item) => item.is_completed);
    return completed.length;
  });

  return {
    todos,
    todos_total,
    todos_completed,
    addTodo,
    deleteTodo,
    completeTodo,
    changeTodoMinutes,
  };
};

export default useTodos;
