<template>
  <div class="row">
    <div class="col q-ma-md " >
      <h2 class="text-uppercase text-center text-weight-regular">Sgma</h2>
      <formulario-usuario />
    </div>
    <div class="col container-img xs-hide">
      <q-img class="full-width" src="../../assets/book.jpg" alt="login-book" style="height: 100vh;" />
    </div>
  </div>
</template>

<script setup>
import FormularioUsuario from 'src/components/formularios/FormularioUsuario.vue';


</script>

<style scoped>
.container-img {
  opacity: 0.8;
}
</style>
