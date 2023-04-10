<template>
  <div class="q-pa-md">
    <p style="text-align: center">Cadastrar Módulo</p>
    <q-form @submit="onSubmit" @reset="onReset">
      <!-- Input -->
      <div style="width: 600px; margin: 0 auto">
        <q-input
          v-model="nome"
          outlined
          label="Nome do Módulo*"
          stack-label
          :dense="dense"
          :rules="nomeRules"
        />
      </div>

      <div style="margin-top: 50px; text-align: center">
        <q-btn label="Cadastrar" type="submit" color="primary" />
        <q-btn
          label="Cancelar"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>


<script setup>
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import { api } from "src/boot/axios";
import { ref } from "vue";

const $q = useQuasar();
const router = useRouter();
const dense = ref(false);

const nome = ref("");

async function onSubmit() { // função para cadastrar o módulo
  const { data } = await api.get("/modulo"); // busca os dados no bd
  let moduloExiste = false;

  for (var i = 0; i < data.length; i++) { // verifica se o módulo existe
    if (nome.value == data[i].nome ) {
      moduloExiste = true;
    }
  }
  if (moduloExiste) { // condição para enviar uma notificação para o usuário
    $q.notify({
      type: "warning",
      message: "Módulo já existe no sistema!",
      timeout: 1000,
      position: "top",
    });
  } else { // cadastra o módulo
    const modulo = await api.post("/modulo", nome.value); // cria o módulo

    $q.notify({ // condição para enviar uma notificação para o usuário
      type: "positive",
      message: "Módulo cadastrado com sucesso!",
      timeout: 1000,
      position: "top",
    });

    setTimeout(() => router.push("/modulo"), 1500);
  }
}

function onReset() {
  nome.value = "";

  setTimeout(() => router.push("/modulos"), 700);
}
</script>

<style scoped>
p {
  font-size: 2em;
}
</style>
