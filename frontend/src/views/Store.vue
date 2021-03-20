<template>
  <b-container v-if="products">
    <h1 class="pt-5">Butikken med {{ products.length }} varer</h1>
    <b-row class="mt-5 pb-5">
      <b-col
        md="6"
        lg="4"
        class="mt-3"
        v-for="product in products"
        :key="product.id"
      >
        <div class="product">
          <img
            :src="
              product.selectedImage
                ? product.selectedImage.url
                : product.images[0].url
            "
            alt="product.name"
          />
          <b-row class="product-images text-left ml-0">
            <div class="image-wrapper">
              <img
                :class="{
                  'selected-product-image':
                    (product.selectedImage &&
                      product.selectedImage.id == image.id) ||
                    (!product.selectedImage && index == 0),
                }"
                v-for="(image, index) in product.images"
                :key="image.id"
                :src="image.formats.thumbnail.url"
                @click="selectImage(product.id, image)"
              />
            </div>
          </b-row>
          <div class="product-description mt-3">
            <h5 class="mb-0">
              {{ product.name }}
            </h5>
          </div>
          <h5 class="mt-0">{{ product.price }},-</h5>
          <button class="purchase-button" @click="addToCart(product)">
            Legg i handlevogn
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
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
  }
  .product img {
    height: 250px;
    width: 100%;
    object-fit: fill;
  }
  .product-images img {
    height: 50px;
    width: 50px;
    object-fit: cover;
    background-position: center center;
    cursor: pointer;
  }
  .image-wrapper {
    background-color: #282c34;
  }
  .selected-product-image {
    opacity: 0.8;
  }
  .product-description {
    text-align: left;
    height: 70px;
  }
</style>
