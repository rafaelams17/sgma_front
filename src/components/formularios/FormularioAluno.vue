<template>
  <div class="column items-center">
    <q-form @submit="salvaDados" @reset="onReset" style="width: 600px;" class="col">
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
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter(); // roteamento dos arquivos, conectar as rotas do projeto
const route = useRoute(); // conectar as rotas URL
const $q = useQuasar();
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

const nomeRules = [(nome) => (nome && nome.length > 0) || "Campo obrigatório"];

const dataRules = [
  (data) => (data != null && data !== "") || "Campo obrigatório",
];

const cpfRules = [(cpf) => (cpf !== null && cpf !== "" && cpf > 0) || "Campo obrigatório"];

async function salvaDados() {
  $q.loading.show({
    message: "Enviando informações ao servidor..."
  })

  try {
    // roteamento para pegar os dados na API - await - aguardar os dados do BD
    const { data } = await api.get("/aluno");

    let alunoExiste = false;

    data.map((aluno) => {
      if (form.value.cpf === aluno.cpf) {
        alunoExiste = true;
      }
    });

    if (alunoExiste) {
      // feedback interativo para o usuário
      $q.notify({
        // tipo da notificação
        type: "warning",
        // mensagem para o usuário
        message: "CPF já existe no sistema!",
        // a posição que a mensagem vai aparacer na tela do usuário
        position: "top",
        // tempo que a mensagem vai ficar na tela do usuário
        timeout: 1000
      });
    }

    // roteamento para salvar os dados na API
    const aluno = await api.post("/aluno", form.value);

    $q.notify({
      type: "positive",
      message: "Aluno cadastrado com sucesso!",
      timeout: 1000,
      position: "top",
    });

    router.push("/alunos") // rota para após salvar os dados ir para página de Aluno
    $q.loading.hide();
  } catch(error) {
    $q.loading.hide();
    $q.notify({
        type: "negative",
        message: "Error do servidor...",
        position: "top",
      });
  }
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

function preencherCampos(data) {
  form.value.nome = data.nome;
  form.value.data_nasc = data.data_nasc;
  form.value.cpf = data.cpf;
}

onMounted(async () => {
  if(props.alunoId) {
    const { data } = await api.get(`aluno/unico/${props.id}`);

    preencherCampos(data);
  }
})
</script>

<style scoped></style>