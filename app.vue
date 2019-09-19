<template>
  <router-view v-if="isRouterAlive"></router-view>
</template>

<script>
export default {
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    changeRoute() {
      this.$router.push({ path: location.hash.substring(1) });
    },
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  mounted() {
    window.addEventListener('hashchange', this.changeRoute);
  },
  beforeDestroy() {
    window.removeEventListener('hashchange', this.changeRoute);
  }
};
</script>
