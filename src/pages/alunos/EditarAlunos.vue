<template>
  <div>
    <h1 class="text-center text-h4">Atualizar Aluno</h1>
    <formulario-aluno enviarBotao="Atualizar" exibirBotaoVoltar="true" />
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
    position: "top",
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