<template>
  <div class="q-pa-md">
    <p style="text-align: center">Cadastrar Aluno</p>
    <q-form @submit="onSubmit" @reset="onReset">
      <!-- Input -->
      <div style="width: 600px; margin: 0 auto">
        <q-input
          v-model="form.nome"
          outlined
          label="Nome *"
          stack-label
          :dense="dense"
          :rules="nomeRules"
        />
        <q-input
          v-model="form.data_nasc"
          outlined
          type="date"
          label="Data de Nascimento *"
          stack-label
          :dense="dense"
          :rules="dataRules"
        />
        <q-input
          v-model="form.cpf"
          outlined
          label="CPF *"
          stack-label
          :dense="dense"
          :rules="cpfRules"
        />
      </div>

      <!-- Botões -->
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
  <!-- <MsgFeedback :msg="msg" v-show="msg" /> -->
</template>

<script setup>
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";
import { ref } from "vue";

const $q = useQuasar();
const router = useRouter();

const form = ref({
  nome: "",
  data_nasc: "",
  cpf: "",
});

const nomeRules = [(nome) => (nome && nome.length > 0) || "Campo obrigatório"];

const dataRules = [
  (data) => (data != null && data !== "") || "Campo obrigatório",
];

const cpfRules = [
  (cpf) => (cpf != null && cpf !== "" && cpf > 0) || "Campo obrigatório",
];

async function onSubmit() {
  const { data } = await api.get("/aluno");
  let alunoExiste = false;

  for (var i = 0; i < data.length; i++) {
    if (form.value.cpf == data[i].cpf) {
      alunoExiste = true;
    }
  }
  if (alunoExiste) {
    $q.notify({
      type: "warning",
      message: "CPF já existe no sistema!",
      timeout: 1000,
    });
  } else {
    const aluno = await api.post("/aluno", form.value);

    $q.notify({
      type: "positive",
      message: "Aluno cadastrado com sucesso!",
      timeout: 1000,
    });

    setTimeout(() => router.push("/alunos"), 1500);
  }
}

function onReset() {
  form.value.nome = "";
  form.value.data_nasc = "";
  form.value.cpf = "";

  setTimeout(() => router.push("/alunos"), 700);
}
</script>

<style scoped>
p {
  font-size: 2em;
}
</style>
