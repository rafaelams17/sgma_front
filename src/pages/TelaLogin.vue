<template>
  <div class="row">
    <div class="col q-ma-md " >
      <h2 class="text-uppercase text-center">Sgma</h2>
      <q-form @submit="onSubmit" style="width: 500px; margin: 0 auto;">
        <q-input label="Usuário:" v-model="login.usuario" lazy-rules :rules="nameRules" />
        <q-input label="Senha:" type="password" v-model="login.senha" lazy-rules :rules="passwordRules" />
        <q-btn class="full-width" label="Entrar" type="submit" color="orange" />
      </q-form>
    </div>
    <div class="col container-img">
      <q-img class="full-width" src="../assets/book.jpg" alt="login-book" style="height: 100vh;" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Notify, useQuasar } from "quasar";
import { api } from "src/boot/axios";

const $q = useQuasar();
const router = useRouter();

const login = ref({
  usuario: "",
  senha: "",
});

const nameRules = [
  (user) => (user && user.length > 0) || "Você precisa preencher os campos em vermelho",
];

const passwordRules = [
  (password) => !!password || "Você precisa preencher os campos em vermelho",
];

async function onSubmit() {
  // const { usuario, senha } = login.value; para extrair os dados do formulário

  const { data } = await api.get("/user");

  console.log("Cgeuguei aqui")


  if (login.value.usuario === data[0].usuario && login.value.senha === data[0].senha) {
    router.push("/");
  } else {
    $q.notify({
      type: "negative",
      message: "Usuário ou senha inválido.",
      position: "top",
    });
  }
}
</script>

<style scoped>
.container-img {
  opacity: 0.8;
}
</style>
