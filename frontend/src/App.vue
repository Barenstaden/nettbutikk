<template>
  <div id="app">
    <Cart />
    <CheckoutComplete />
    <loading
      :active.sync="loading"
      :is-full-page="true"
      :opacity="0.8"
    ></loading>
    <router-view />
  </div>
</template>

<script>
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';
  import { mapGetters } from 'vuex';
  export default {
    components: {
      Cart: () => import('@/components/Cart.vue'),
      CheckoutComplete: () => import('@/components/CheckoutComplete.vue'),
      Loading,
    },
    computed: {
      ...mapGetters(['loading']),
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #fafafa;
    min-height: 100vh;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
  button {
    background-color: #08aeea;
    border-radius: 25px !important;
    color: #fff;
    border: none;
    padding: 5px 20px;
  }
</style>
