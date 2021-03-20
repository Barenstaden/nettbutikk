<template>
  <b-modal
    v-model="modal"
    cancel-disabled
    centered
    title="Din ordre er på vei! 🚀"
    ok-only
    modal-ok="Lukk"
  >
    <p class="my-4">
      Vi har satt alle i sving for å sende av gårde din bestilling.
    </p>
  </b-modal>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    computed: {
      ...mapGetters(['checkoutCompleteModal']),
      modal: {
        get() {
          return this.checkoutCompleteModal;
        },
        set(show) {
          this.$store.commit('checkoutCompleteModal', show);
        },
      },
    },
  };
</script>

<style></style>
