import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCounterStore2 = defineStore('counter2', () => {
    const count = ref(0);
    const increment = (n) => {
        count.value += n;
    }
    const doubleCount = computed(() => count.value * 2);

    return { count, increment, doubleCount }
})