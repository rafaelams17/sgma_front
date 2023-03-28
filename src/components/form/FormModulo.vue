<template>
  <div class="q-pa-md">
    <p style="text-align: center">Cadastrar Módulo</p>
    <q-form @submit="onSubmit" @reset="onReset">
      <!-- Input -->
      <div style="width: 600px; margin: 0 auto">
        <q-input
          v-model="form.nome"
          outlined
          label="Nome do Módulo*"
          stack-label
          :dense="dense"
          :rules="nomeRules"
        />
        <q-input
          v-model="form.nota1"
          outlined
          label="Nota 1"
          type="text"
          stack-label
          :dense="dense"
          :rules="nota1Rules"
        />
        <q-input
          v-model="form.nota2"
          outlined
          label="Nota 2"
          type="text"
          stack-label
          :dense="dense"
          :rules="nota2Rules"
        />
        <q-input
          v-model="form.nota3"
          outlined
          label="Nota 3"
          type="text"
          stack-label
          :dense="dense"
          :rules="nota3Rules"
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
const route = useRoute();
const dense = ref(false);
const id = route.params.id; // pega o id da rota (URL)

const form = ref({
  nome: "",
  nota1: null,
  nota2: null,
  nota3: null,
  id_aluno: Number(id), // associa o módulo com o usuário
});

const nomeRules = [(nome) => (nome && nome.length > 0) || "Campo obrigatório"];

const nota1Rules = [
  (nota1) => (nota1 >= 0 && nota1 <= 10) || "Insera uma nota válida",
];

const nota2Rules = [
  (nota2) => (nota2 >= 0 && nota2 <= 10) || "Insera uma nota válida",
];

const nota3Rules = [
  (nota3) => (nota3 >= 0 && nota3 <= 10) || "Insera uma nota válida",
];

async function onSubmit() { // função para cadastrar o módulo
  const { data } = await api.get("/modulo"); // busca os dados no bd
  let moduloExiste = false;

  for (var i = 0; i < data.length; i++) { // verifica se o módulo existe
    if (
      form.value.nome == data[i].nome &&
      form.value.id_aluno == data[i].id_aluno
    ) {
      moduloExiste = true;
    }
  }
  if (moduloExiste) { // condição para enviar uma notificação para o usuário
    $q.notify({
      type: "warning",
      message: "Módulo já existe no sistema!",
      timeout: 1000,
    });
  } else { // cadastra o módulo
    if(form.value.nota1 !== null ){
      form.value.nota1 = Number(form.value.nota1);
    }
    if(form.value.nota2 !== null ){
      form.value.nota2 = Number(form.value.nota2);
    }
    if(form.value.nota3 !== null ){
      form.value.nota3 = Number(form.value.nota3);
    }
    form.value.id_aluno = id;

    const aluno = await api.post("/modulo", form.value); // cria o módulo

    $q.notify({ // condição para enviar uma notificação para o usuário
      type: "positive",
      message: "Módulo cadastrado com sucesso!",
      timeout: 1000,
    });

    setTimeout(() => router.push(`/modulos/${id}`), 1500); // "/modulos/" + id, volta para a tela principal de módulo
  }
}

function onReset() {
  form.value.nome = "";
  form.value.nota1 = "";
  form.value.nota2 = "";
  form.value.nota3 = "";

  setTimeout(() => router.push(`/modulos/${id}`), 700);
}
</script>

<style scoped>
p {
  font-size: 2em;
}
</style>
