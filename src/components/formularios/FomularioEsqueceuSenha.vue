<template>
  <q-form @submit="onSubmit" style="max-width: 500px; margin: 0 auto;">
    <p>Esqueceu a senha</p>
    <q-input label="Usuário:" v-model="login.usuario" lazy-rules :rules="nameRules"/>
    <q-input label="Senha:" :type="isPwd ? 'password': 'text'" v-model="login.senha" lazy-rules :rules="passwordRules" class="row">
      <template v-slot:append>
        <q-icon :name="isPwd ? 'visibility_off': 'visibility'" class="cursor-pointer " size="sm" @click="isPwd = !isPwd"/>
      </template>
    </q-input>
    <div class="row justify-between">
      <div class="row">
        <p class="q-pr-sm">Não tem uma conta?</p>
        <p class="style-link" @click="createAccount()">Cadastre-se</p>
      </div>
      <p class="style-link" @click="createAccount()">Esqueceu a senha?</p>
    </div>
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

<style scoped>
.style-link {
  transition: .3s;
  color: #9c4e05;
}

.style-link:hover {
  text-decoration: underline;
  cursor: pointer;
  opacity: 0.8;
}
</style>