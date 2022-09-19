import { defineStore } from "pinia";

export const useCounterStore1 = defineStore('counter1', {
    state: () => {
        return { count: 0 }
    },
    getters: {
        doubleCount: state => state.count * 2,
    },
    actions: {
        increment(n) {
            return this.count += n;
        }
    }

})