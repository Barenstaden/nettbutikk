import { stat } from 'node:fs';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartItems: [],
    showCart: false,
    loading: false,
    checkoutCompleteModal: false,
  },
  getters: {
    cartItems: (state) => state.cartItems,
    showCart: (state) => state.showCart,
    loading: (state) => state.loading,
    checkoutCompleteModal: (state) => state.checkoutCompleteModal,
  },
  mutations: {
    addToCart: (state, product) => {
      product.count = 1;
      state.cartItems.push(product);
    },
    removeFromCart: (state, product) => {
      const index = state.cartItems.findIndex((item) => item.id == product.id);
      state.cartItems.splice(index, 1);
    },
    toggleCart: (state, show) => {
      state.showCart = show;
    },
    updateItemWithNewCount: (state, item) => {
      state.cartItems = state.cartItems.map((cartItem) => {
        if (cartItem.id == item.id) cartItem.count = item.count;
        return cartItem;
      });
    },
    toggleLoading: (state, loading) => {
      state.loading = loading;
    },
    checkoutCompleteModal: (state, show) => {
      state.checkoutCompleteModal = show;
    },
  },
});
