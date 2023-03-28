<template>
  <div class="q-pa-md">
    <p style="text-align: center">Editar Módulo</p>
    <q-form @submit="onAtualizar" @reset="onReset">
      <!-- Input -->
      <div style="width: 600px; margin: 0 auto">
        <q-input
          v-model="form.nome"
          outlined
          label="Nome do Módulo*"
          stack-label
        />
        <q-input
          v-model="form.nota1"
          outlined
          label="Nota 1"
          stack-label
          style="margin-top: 15px"
        />
        <q-input
          v-model="form.nota2"
          outlined
          label="Nota 2"
          stack-label
          style="margin-top: 15px"
        />
        <q-input
          v-model="form.nota3"
          outlined
          label="Nota 3"
          stack-label
          style="margin-top: 15px"
        />
      </div>

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
const router = useRouter();
const route = useRoute();
const id = route.params.id;

const form = ref({
  nome: "",
  nota1: null,
  nota2: null,
  nota3: null,
  id_aluno: "", // associa o módulo com o usuário
});

async function onAtualizar() {
  if(form.value.nota1 !== null ){
    form.value.nota1 = Number(form.value.nota1);
  }
  if(form.value.nota2 !== null ){
    form.value.nota2 = Number(form.value.nota2);
  }
  if(form.value.nota3 !== null ){
    form.value.nota3 = Number(form.value.nota3);
  }

  const { id_aluno } = form.value;

  const moduloEditado = await api.put(`modulo/${id}`, form.value); // atualiza o módulo

  $q.notify({ // feedback de atualizado!
    type: "positive",
    message: "Módulo atualizado com sucesso!",
    timeout: 1000,
  });
  setTimeout(() => router.push(`/modulos/${id_aluno}`), 1500); // "/modulos/" + id
}

function onReset() {
  form.value.nome = "";
  form.value.nota1 = "";
  form.value.nota2 = "";
  form.value.nota3 = "";

  setTimeout(() => router.push(`/modulos/${form.value.id_aluno}`), 700);
}

onMounted(async () => { // puxa os dados do banco de dados para os campos de entradas
  const { data } = await api.get(`modulo/unico/${id}`); // rota para o banco
  console.log(data);
  form.value = data; // outra forma de fazer o que essas linhas abaixo fazem
  // form.value.nome = data.nome;
  // form.value.nota1 = data.nota1;
  // form.value.nota2 = data.nota2;
  // form.value.nota3 = data.nota3;
  // form.value.id_aluno = data.id_aluno;
})
</script>

<style scoped>
p {
  font-size: 2em;
}
</style>
