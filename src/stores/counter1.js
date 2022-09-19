import { defineStore } from "@/pinia";

export const useCounterStore1 = defineStore('counter1', {
    state: () => {
        return { count: 0 }
    },
    getters: {
        // 传参 state的问题未解决
        doubleCount(state)  {
            // state.count * 2
            console.log('state:', state);
            return this.count * 2;
        },
    },
    actions: {
        increment(n) {
            return this.count += n;
        }
    }

})