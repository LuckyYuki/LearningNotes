# Vue Refresh 组件刷新

```javascript
<template>
  <div id="app">
    <router-view v-if="isRouterAlive" v-cloak/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        isRouterAlive: true
      };
    },
    methods: {
      //刷新当前页面
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(() => {
          this.isRouterAlive = true;
        });
      }
    }
  }
</script>
```
