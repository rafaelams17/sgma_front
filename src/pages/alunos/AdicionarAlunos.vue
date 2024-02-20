<template>
  <q-page>
    <h1 class="text-center text-h4">Cadastrar Aluno</h1>
    <formulario-aluno enviarBotao="Cadastrar" exibirBotaoVoltar="true" @submit="onSubmit" />
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar';
import FormularioAluno from 'src/components/formularios/FormularioAluno.vue';
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';

const $q = useQuasar();
const router = useRouter();

async function salvaDados(dados) {
  $q.loading.show({
    message: "Enviando informações ao servidor..."
  })

  try {
    const alunos = await api.get("/alunos");
    const alunosData = alunos.data;

    let alunoExiste = false;

    alunosData.map(aluno => {
      if (dados.cpf === aluno.cpf) {
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
    } else {
      const data = { ...dados };

      // roteamento para salvar os dados na API
      const { status } = await api.post("/alunos", data);

      if (status == 201) {
        $q.notify({
          type: "positive",
          message: "Aluno cadastrado com sucesso!",
          timeout: 1000,
          position: "top",
        });

        router.push("/alunos") // rota para após salvar os dados ir para página de Aluno
      }
    }
    $q.loading.hide();
  } catch (error) {
    $q.loading.hide();
    $q.notify({
      type: "negative",
      message: "Error do servidor...",
      position: "top",
    });
  }
}
async function onSubmit(dados) {
  salvaDados(dados);
}
</script>