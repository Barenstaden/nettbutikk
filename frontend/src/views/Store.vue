<template>
  <b-container v-if="products">
    <h1 class="pt-5">Butikken med {{ products.length }} varer</h1>
    <b-row class="mt-5">
      <b-col md="4" class="mt-3" v-for="product in products" :key="product.id">
        <div class="product">
          <img
            :key="product.id"
            :src="
              product.selectedImage
                ? product.selectedImage.url
                : product.images[0].url
            "
            alt="product.name"
          />
          <b-row class="product-images text-left ml-0">
            <img
              v-for="image in product.images"
              :key="image.id"
              :src="image.formats.thumbnail.url"
              @click="selectImage(product.id, image)"
            />
          </b-row>
          <div class="product-description mt-3">
            <h5 class="mb-0">
              {{ product.name }}
            </h5>
          </div>
          <h5 class="mt-0">{{ product.price }},-</h5>
          <button class="purchase-button" @click="addToCart(product)">
            Legg i handlekurv
          </button>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import gql from 'graphql-tag';
  import { mapGetters } from 'vuex';
  export default {
    apollo: {
      products: {
        query: gql`
          query {
            products {
              id
              product_id
              name
              price
              images {
                id
                formats
                url
              }
            }
          }
        `,
      },
    },
    methods: {
      selectImage(productId, image) {
        this.products = this.products.map((product) => {
          if (product.id == productId) {
            product.selectedImage = image;
          }
          return product;
        });
      },
      addToCart(product) {
        if (!this.cartItems.some((item) => item.id == product.id))
          this.$store.commit('addToCart', product);

        this.$store.commit('toggleCart', true);
      },
    },
    computed: {
      ...mapGetters(['cartItems']),
      productsWithSelectedImage() {
        return this.products.filter(
          (product) => (product.selectedImage = product.images[0]),
        );
      },
    },
  };
</script>

<style scoped>
  .product {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 20px;
  }
  .product img {
    width: 100%;
    height: 300px;
  }
  .product-images img {
    height: 50px;
    width: auto;
    cursor: pointer;
  }
  .product-description {
    text-align: left;
    height: 70px;
  }
</style>
