<template>
  <div>
    <h1 class="text-center text-h4">Atualizar Aluno</h1>
    <formulario-aluno :alunoId="id" enviarBotao="Atualizar" exibirBotaoVoltar="true" @submit="onSubmit" />
  </div>
</template>

<script setup>
import FormularioAluno from 'src/components/formularios/FormularioAluno.vue';

import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import { api } from "src/boot/axios";
import { useRouter, useRoute } from "vue-router";

const $q = useQuasar();
const router = useRouter(); // conectar as rotas do projeto
const route = useRoute(); // conectar as rotas URL
const { id } = route.params; // pega o id da rota (URL)

async function editarDados(dados) {
  const data = { ...dados };

  const { status } = await api.put(`alunos/${id}`, data);

  if (status == 200) {
    $q.notify({ // feedback de atualizado para o usuário!
      type: "positive",
      message: "Aluno atualizado com sucesso!",
      timeout: 1000,
      position: "top",
    });
    setTimeout(() => router.push("/alunos"), 1500);
  }
}

async function onSubmit(dados) {
  editarDados(dados);
}
</script>