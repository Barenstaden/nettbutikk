<template>
  <b-container v-if="remoteOrLocalProducts">
    <h1 class="pt-5">Butikken med {{ remoteOrLocalProducts.length }} varer</h1>

    <!-- Produkter -->
    <b-row class="mt-5 pb-5">
      <b-col
        md="6"
        lg="4"
        class="mt-3"
        v-for="product in remoteOrLocalProducts"
        :key="product.id"
      >
        <!-- Produkt -->
        <div class="product">
          <!-- Vise hovedbilde om ikke et annet bilde fra images er valgt -->
          <img
            :src="
              product.selectedImage
                ? product.selectedImage.url
                : product.images[0].url
            "
            alt="product.name"
          />

          <!-- Thumbnails under hovedbilde -->
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

          <!-- Beskrivelse, pris og legg i handlevogn -->
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
  import localProducts from '@/assets/products.json';
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        localProducts,
        // Endre til hva som helst for å hente fra Strapi
        fetchProductsFrom: 'local',
      };
    },
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
      // Endre hovedbilde fra thumbnails
      selectImage(productId, image) {
        this.products = this.products.map((product) => {
          if (product.id == productId) {
            product.selectedImage = image;
          }
          return product;
        });
      },
      // Legge til cart i store
      addToCart(product) {
        if (!this.cartItems.some((item) => item.id == product.id))
          this.$store.commit('addToCart', product);

        this.$store.commit('toggleCart', true);
      },
    },
    computed: {
      // Fra store
      ...mapGetters(['cartItems']),
      remoteOrLocalProducts() {
        return this.fetchProductsFrom == 'local'
          ? this.localProducts
          : this.products;
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
