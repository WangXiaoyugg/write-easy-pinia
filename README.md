# 手写Pinia
1. pinia 是什么？
2. pinia 的特点？
3. pinia 的实现


## pinia 是什么？
pinia 是 vue 的状态管理工具，用来取代vuex。 
  - 它默认支持多个仓库，解决了vuex的state 和模块名的命名冲突的问题。
  - 它采用扁平化的方式管理store. 解决了vuex树状结构不好维护状态的问题。
  - 它更改状态仅通过action, 删除了mutation，减少了使用者的心智负担
  


## pinia 的特点
- 扁平化Store, 支持多个store
- 没有mutation, 降低心智负担
- typescript的良好支持, 不用在写类型了!
- 轻量级，体积小，支持devtools
- 兼容支持辅助函数，mapState/mapActions/mapGetters等
  

## pinia 的实现
1. createPinia, 插件入口
2. defineStore, 创建store 实例

## 其他知识点
vuex 中 action 的核心作用是封装