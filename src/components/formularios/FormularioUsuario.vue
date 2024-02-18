<template>
  <q-form @submit="onSubmit" style="max-width: 500px; margin: 0 auto;">
    <p>Não tem uma conta? <a href="#">Cadastre-se</a></p>
    <q-input label="Usuário:" v-model="login.usuario" lazy-rules :rules="nameRules"/>
    <q-input label="Senha:" :type="isPwd ? 'password': 'text'" v-model="login.senha" lazy-rules :rules="passwordRules" class="row">
      <template v-slot:append>
        <q-icon :name="isPwd ? 'visibility_off': 'visibility'" class="cursor-pointer " size="sm" @click="isPwd = !isPwd"/>
      </template>
    </q-input>
    <p><a href="#">Esqueceu a senha?</a></p>
    <q-btn class="full-width" label="Entrar" type="submit" color="orange" />
  </q-form>
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

const isPwd = ref(true)

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

<style scoped></style>