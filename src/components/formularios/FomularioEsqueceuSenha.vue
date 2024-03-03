<template>
  <q-form @submit="onSubmit" style="max-width: 500px; margin: 0 auto;">
    <q-input label="Email:" v-model="form.email" lazy-rules :rules="nameRules" />
    <div v-if="showPassword">
      <q-input label="Senha:" :type="isPwd ? 'password' : 'text'" v-model="form.senha" lazy-rules :rules="passwordRules"
        class="row">
        <template v-slot:append>
          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer " size="sm"
            @click="isPwd = !isPwd" />
        </template>
      </q-input>
      <q-input label="Confirmar Senha:" :type="isPwd ? 'password' : 'text'" v-model="form.confirmar_senha" lazy-rules
        :rules="passwordRules" class="row">
        <template v-slot:append>
          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer " size="sm"
            @click="isPwd = !isPwd" />
        </template>
      </q-input>
    </div>
    <q-btn class="full-width" label="Recuperar senha" type="submit" color="primary" />
    <q-btn class="btn-fixed-width q-mt-md" color="primary" label="Voltar para Login" icon="arrow_back" flat @click="backToLogin()" />
  </q-form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Notify, useQuasar } from "quasar";
import { api } from "src/boot/axios";

const $q = useQuasar();
const router = useRouter();

const showPassword = false;

const form = ref({
  email: "",
  senha: "",
  confirmar_senha: "",
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

function backToLogin() {
  router.push("/")
}
</script>

<style scoped>

</style>