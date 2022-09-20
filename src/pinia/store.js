import { computed, effectScope, getCurrentInstance, inject, reactive } from "vue";
import { piniaSymbol } from "./rootStore";

function createSetupStore(id, setup, pinia) {
    let store = reactive({});
    let scope;
    const setupStore = pinia._e.run(() => {
        scope = effectScope();
        return scope.run(() => setup())
    })

    function wrapAction (name, action) {
        return  function() {
           let ret = action.apply(store, arguments)
           // action 执行之后可能是promise, todo
           return ret;
        }
    }

    for (let key in setupStore) {
        const prop = setupStore[key] 
        if (typeof  prop === 'function') {
            setupStore[key] = wrapAction(key, prop);
        }
    }

    Object.assign(store, setupStore)
    pinia._s.set(id, store);
    return store;
}

function createOptionsStore(id, options, pinia) {
    let { state, getters, actions } = options
    // 内部属性的store;
    
    function setup() {
        const localState = pinia.state.value[id] = state ? state() : {};
        return Object.assign(
            localState, 
            actions, 
            Object.keys(getters || {}).reduce((memo, name) => {
                memo[name] = computed(() => {
                   const store = pinia._s.get(id)
                //    console.log(store, localState);
                   return getters[name].call(store, store);
                })
                return memo;
            }, {})
        );
    }
  

   return createSetupStore(id, setup, pinia);

   
}

// id + options
// options
// id + setup 
export function defineStore(idOrOptions, setup) {
    let id, options;
    if (typeof idOrOptions === 'string') {
        id = idOrOptions;
        options = setup;
    } else {
        id = idOrOptions.id;
        options = idOrOptions;
    }

    let isSetup = typeof setup === 'function';

    function useStore() {
        const instance = getCurrentInstance();
        const pinia = instance && inject(piniaSymbol);
        if (!pinia._s.has(id)) {
            if (isSetup) {
                createSetupStore(id, setup, pinia)
            } else {
                createOptionsStore(id, options, pinia);
            }
        }

        const store = pinia._s.get(id);
        return store;
    }

    return useStore;
}