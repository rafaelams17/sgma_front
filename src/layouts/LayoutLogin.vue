<template>
  <div class="row">
    <div class="col" style="margin: 100px 0 70px 0;">
      <h2 class="text-uppercase text-center text-weight-regular no-margin">Sgma</h2>
      <router-view />
    </div>
    <div class="col container-img xs-hide">
      <!-- <q-img class="full-width" src="../assets/book.jpg" alt="login-book" style="height: 100vh;" /> -->
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.container-img {
  background: linear-gradient(to bottom, 
    rgba(50, 114, 166, 0.918),
    rgba(123, 215, 86, 0.315)),
    url("../assets/book.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  height: 100vh;
  color: rgb(101, 138, 224)
  }
</style>
