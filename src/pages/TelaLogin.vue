<template>
  <img src="../assets/book.jpg" class="book" alt="login-book" />
  <div class="row col-0 col-md-6 flex content-center" style="height: 100vh">
    <!-- Inputs -->
    <div
      v-bind:class="{
        'justify-center': $q.screen.md || $q.screen.sm || $q.screen.xs,
      }"
      class="col-12 col-md-6 flex content-center login"
    >
      <q-card
        v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '50%' }"
      >
        <q-card-section>
          <!-- Titulo -->
          <div class="q-pt-lg col text-h6 ellipsis flex justify-center">
            <h2 class="text-h2 text-uppercase q-my-none text-weight-regular">
              sgma
            </h2>
          </div>
        </q-card-section>

        <!-- Form -->
        <q-form class="q-gutter-md q-px-md" @submit.prevent.stop="submitForm">
          <q-input
            label="Usuário:"
            v-model="login.usuario"
            lazy-rules
            :rules="nameRules"
          ></q-input>
          <q-input
            label="Senha:"
            type="password"
            v-model="login.senha"
            lazy-rules
            :rules="passwordRules"
          ></q-input>
          <!-- Botões -->
          <div>
            <q-btn
              style="background: orange"
              class="full-width"
              label="Entrar"
              type="submit"
              rounded
            >
            </q-btn>
            <div class="text-center q-mt-sm q-gutter-lg">
              <router-link to="\"></router-link>
            </div>
          </div>
        </q-form>
      </q-card>
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

async function submitForm() {
  // const { usuario, senha } = login.value; para extrair os dados do formulário

  const { data } = await api.get("/user");

  if(login.value.usuario === data[0].usuario && login.value.senha === data[0].senha){
    router.push("/");
  } else {
    $q.notify({
      type: "negative",
      message: "Usuário ou senha inválido.",
    });
  }
}
</script>

<style scoped>
.book {
  position: fixed;
  height: 100%;
  width: 45%;
  right: 0;
  bottom: 0;
  z-index: -1;
  opacity: 0.4;
}

.login {
  margin-left: 300px;
}
</style>
