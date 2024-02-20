<template>
  <div class="column items-center">
    <q-form @submit.prevent.stop="$emit('submit', form)" @reset="onReset" style="width: 600px;" class="col">
      <q-input v-model="form.nome" label="Nome Completo *" :dense="dense" :rules="nomeRules" stack-label outlined />
      <q-input v-model="form.data_nasc" label="Data de Nascimento *" type="date" :dense="dense" :rules="dataRules"
        stack-label outlined />
      <q-input v-model="form.cpf" label="CPF *" :dense="dense" :rules="cpfRules" mask="###.###.###-##" unmasked-value
        stack-label outlined />
      <!-- mask é um atributo usado para formatar a entrada do dado neste caso o cpf -->

      <div class="row justify-center q-mt-md">
        <q-btn class="col-3" :label="enviarBotao" type="submit" color="primary" />

        <q-btn v-if="exibirBotaoVoltar" class="col-3" label="Cancelar" type="reset" color="primary" flat />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { api } from 'src/boot/axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter(); // roteamento dos arquivos, conectar as rotas do projeto
const dense = ref(false);

const props = defineProps([
  "alunoId",
  "enviarBotao",
  "exibirBotaoVoltar",
])

const form = ref({
  nome: "",
  data_nasc: "",
  cpf: "",
});

function validaNome(nome) {
  const regex = /[!@#$%*()_+=-?°``''~,.;<>:]|[0-9]/g;

  return !regex.test(nome);
}

const nomeRules = [
  (nome) => !!nome || "Campo obrigatório",
  (nome) => validaNome(nome) || "*Proibido o uso dos seguintes caracteres [!@#$%*()_+=-?°``''~,.;<>:], valores numéricos ou espaços",
];

const dataRules = [
  (data) => (data != null && data !== "") || "Campo obrigatório",
];

const cpfRules = [(cpf) => (cpf !== null && cpf !== "" && cpf > 0) || "Campo obrigatório"];

async function buscaAluno(id) {
  // roteamento para pegar os dados na API - await - aguardar os dados do BD
  const { data } = await api.get(`alunos/busca-um/${id}`);

  return data;
}

function preencherCampos(data) {
  form.value.nome = data.nome;
  form.value.data_nasc = data.data_nasc;
  form.value.cpf = data.cpf;
}

function onReset() {
  // limpar os inputs
  form.value.nome = "";
  form.value.data_nasc = "";
  form.value.cpf = "";

  // rota para voltar para a página de Aluno
  setTimeout(() => {
    router.push("/alunos"), 700
  });
}

onMounted(async () => {
  if (props.alunoId) {
    const data = await buscaAluno(props.alunoId);

    preencherCampos(data);
  }
})
</script>

<style scoped></style>