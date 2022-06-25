<template>
  <div style="display: flex; align-items: center">
    <div>
      <p>{{ idx }} +</p>
    </div>
    <div>
      <p :style="name_style">{{ name }}</p>
      <label :for="`${id}_minutes`">Minutes:</label>
      <template v-if="!is_completed">
        <input :id="`${id}_minutes`" type="number" v-model="minutes" />
      </template>
      <template v-else>
        <strong>{{ minutes }}</strong>
      </template>
    </div>
    <div><input type="checkbox" v-model="is_completed" /></div>
    <div>
      <button @click="deleteItem">X</button>
    </div>
  </div>
</template>
<script>
import { computed, emit, ref, watch } from 'vue';
export default {
  name: 'ToDoItem',
  emits: ['deleteItem', 'completeItem', 'changeMinutes'],
  props: {
    item: Object,
    idx: Number,
  },
  setup(props, { emit }) {
    const name = ref(props.item.name);
    const is_completed = ref(props.item.is_completed);
    const id = ref(props.item.id);
    const minutes = ref(props.item.minutes);

    watch(props, (newVal) => {
      name.value = newVal.item.name;
      is_completed.value = newVal.item.is_completed;
      id.value = newVal.item.id;
      minutes.value = newVal.item.minutes;
    });

    watch(is_completed, (newVal) => {
      emit('completeItem', {
        id: id.value,
        idx: props.idx,
        is_completed: is_completed.value,
      });
    });

    watch(minutes, (newVal) => {
      emit('changeMinutes', {
        id: id.value,
        idx: props.idx,
        minutes: newVal,
      });
    });

    function deleteItem(e) {
      emit('deleteItem', id.value);
    }

    const name_style = computed(() => {
      return is_completed.value
        ? 'color:green; text-decoration: line-through black;'
        : 'color:red; text-decoration: none;';
    });
    return {
      name,
      is_completed,
      deleteItem,
      id,
      minutes,
      name_style,
    };
  },
};
</script>
