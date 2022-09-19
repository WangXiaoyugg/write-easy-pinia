import { ref, effectScope } from 'vue'
import { piniaSymbol } from './rootStore'
export function createPinia() {
    const scope = effectScope(true)
    const state = scope.run(() => ref({}))
    const pinia = {
        _s: new Map(),
        state,
        install (app) {
            app.provide(piniaSymbol, pinia);
            app.config.globalProperties.$pinia = pinia;
        },
        _e: scope,
    }
    
    return pinia;
}