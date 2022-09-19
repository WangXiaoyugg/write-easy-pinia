<script setup>
import { useCounterStore1 } from './stores/counter1';
import { useCounterStore2 } from './stores/counter2';

const store1 = useCounterStore1();
const { increment } = store1;
const handleClick1 = () => {
  increment(3)
}

const store2 = useCounterStore2();
const handleClick2 = () => {
  store2.increment(10)
}
</script>

<template>
  <div>
    <h5>例1</h5>
    <p>数字: {{ store1.count }} / {{ store1.doubleCount }}</p>
    <p><button @click="handleClick1">累加</button></p>
    <hr>
    <h5>例2</h5>
    <p>数字: {{ store2.count }} / {{ store2.doubleCount }}</p>
    <p><button @click="handleClick2">累加</button></p>
  </div>
</template>

<style scoped>

</style>
