<template>
  <div>
    
    <!-- Knapp for å vise handlevogn om sidebar er lukker -->
    <button
      class="cart-button"
      @click="toggleCart(true)"
      v-if="cartItems.length"
    >
      🛒 {{ cartItems.length }}
    </button>
    <!-- Handlevogn -->
    <b-sidebar v-model="localShowCart" title="Handlevogn" right shadow backdrop>
      <h4 class="mt-5" v-if="!cartItems.length">Din handlevogn er tom 🛒</h4>

      <!-- Items -->
      <b-col class="px-3 py-2" v-for="item in cartItems" :key="item.id">
        <ul class="list-unstyled text-left">
          <li class="mt-4">
            <img :src="item.images[0].url" :alt="item.name" class="mr-4" />
            <p>{{ item.name }}</p>
          </li>
        </ul>

        <!-- Endre antall av samme vare, maks 10 -->
        <b-col class="text-right">
          <select @change="submitUpdateCount(item)" v-model="item.count">
            <option v-for="count in 10" :key="count" :value="count">
              {{ count }}
            </option>
          </select>
          x
          <strong>{{ item.price }},-</strong>
        </b-col>

        <!-- Fjerne produkt fra handlevogn -->
        <b-col class="text-right">
          <button class="remove-from-cart ml-1" @click="removeFromCart(item)">
            Fjern
          </button>
        </b-col>
      </b-col>

      <!-- Totalpris og fortsett til kasse -->
      <b-col v-if="cartItems.length">
        <h5 class="text-right mr-3 mt-4">Totalt {{ totalSum }},-</h5>
      </b-col>
      <b-col class="mt-5" v-if="cartItems.length">
        <button @click="checkout">Fortsett til kassen</button>
      </b-col>
    </b-sidebar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    methods: {
      // Toggle sidebar i store
      toggleCart(show) {
        this.$store.commit('toggleCart', show);
      },
      // Endre antall av produkt
      submitUpdateCount(item) {
        this.$store.commit('updateItemWithNewCount', item);
      },
      // Fjerne produkt
      removeFromCart(item) {
        this.$store.commit('removeFromCart', item);
      },
      // Vise fullført-modal
      checkout() {
        this.$store.commit('toggleLoading', true);
        setTimeout(() => {
          this.$store.commit('toggleLoading', false);
          this.$store.commit('checkoutCompleteModal', true);
        }, 2000);
      },
    },
    computed: {
      // Fra store
      ...mapGetters(['cartItems', 'showCart']),
      // For å kunne endre showCart i store
      localShowCart: {
        get() {
          return this.showCart;
        },
        set(show) {
          this.$store.commit('toggleCart', show);
        },
      },
      // Totalsum for alle varer
      totalSum() {
        return this.cartItems.reduce((acc, item) => {
          acc += item.count * item.price;
          return acc;
        }, 0);
      },
    },
  };
</script>

<style scoped>
  .cart-button {
    float: right;
    margin-top: 20px;
    margin-right: 20px;
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
    color: #333;
  }
  ul {
    margin: 0;
  }
  ul li {
    display: inline-flex;
  }
  img {
    height: 50px;
  }
  p {
    font-size: 14px;
  }
  .remove-from-cart {
    background-color: rgba(0, 0, 0, 0);
    color: red;
    padding: 0;
  }
</style>
