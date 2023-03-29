<template>
  <div class="q-pa-md">
    <p style="text-align: center">Editar Aluno</p>
    <q-form @submit="onAtualizar" @reset="onReset">
      <!-- Input dos dados do Aluno -->
      <div style="width: 600px; margin: 0 auto">
        <q-input type="text" v-model="form.nome" outlined label="Nome *" stack-label style="margin-bottom: 15px" />

        <q-input type="date" v-model="form.data_nasc" outlined label="Data de Nascimento *" stack-label />
        <q-input type="text" v-model="form.cpf" outlined label="CPF *" stack-label style="margin-top: 15px" />
      </div>

      <!-- Botões -->

      <div style="margin-top: 50px; text-align: center">
        <q-btn label="Atualizar" type="submit" color="primary" />
        <q-btn label="Cancelar" type="reset" color="primary" flat />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import { api } from "src/boot/axios";
import { useRouter, useRoute } from "vue-router";

const $q = useQuasar();
const router = useRouter(); // conectar as rotas do projeto
const route = useRoute(); // conectar as rotas URL
const id = route.params.id; // pega o id da rota (URL)

const form = ref({
  nome: "",
  data_nasc: "",
  cpf: "",
  id_aluno: Number(id) // associa o aluno que vai ser editado
});

async function onAtualizar() {
  delete form.value.id_aluno; // deletar este elemento pois ele não vai ser recebido como parametro
  const alunoEditado = await api.put(`aluno/${id}`, form.value);

  $q.notify({ // feedback de atualizado para o usuário!
    type: "positive",
    message: "Aluno atualizado com sucesso!",
    timeout: 1000,
  });
  setTimeout(() => router.push("/alunos"), 1500);
}

function onReset() {
  form.value.nome = "";
  form.value.data_nasc = "";
  form.value.cpf = "";

  setTimeout(() => router.push("/alunos"), 700);
}

onMounted(async () => {
  const { data } = await api.get(`aluno/unico/${id}`);
  // console.log(data);
  form.value.nome = data.nome;
  form.value.data_nasc = data.data_nasc;
  form.value.cpf = data.cpf;
})
</script>

<style scoped>
p {
  font-size: 2em;
}
</style>
