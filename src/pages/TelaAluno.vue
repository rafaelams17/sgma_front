<template>
  <div class="q-pa-md">
    <q-table
      title="Alunos"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
    >
      <template v-slot:top>
        <q-btn
          color="primary"
          :disable="loading"
          label="Adicionar aluno"
          @click="addAluno"
        />
        <q-space />
        <q-input
          filled
          borderless
          dense
          style="width: 400px;"
          debounce="300"
          color="primary"
          v-model="filter"
          label="Pesquisar aluno"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-acoes="props">
        <q-td :props="props">
          <q-btn
            size="sm"
            icon="folder"
            class="q-px-sm"
            title="Gerenciar Módulo do Aluno"
            color="deep-purple-10"
            @click="ModuleAluno(props.row.id)"
          />
          <q-btn
            size="sm"
            icon="edit"
            class="q-mx-sm q-px-sm"
            title="Editar Aluno"
            color="orange-8"
            @click="editAluno(props.row.id)"
          />
          <q-btn
            size="sm"
            class="q-px-sm"
            icon="delete"
            title="Deletar Aluno"
            color="red-8"
            @click="deleteAluno(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";
import routes from "src/router/routes";

const router = useRouter();
const $q = useQuasar();
const loading = ref(false);
const filter = ref("");
const search = ref("");

const columns = [
  {
    name: "nome",
    required: true,
    label: "Nome Completo",
    align: "left",
    field: "nome",
  },
  {
    name: "data_nasc",
    required: true,
    label: "Data de Nascimento",
    align: "center",
    field: (linha) => {
      const { data_nasc } = linha;
      let dataFormatada = data_nasc.split("-"); // cortar o dado e armazena em array
      dataFormatada = dataFormatada.reverse(); // inverte as posições do array
      dataFormatada = dataFormatada.join("/"); // inserir a barra entre as posições separadas do array
      //console.log(dataFormatada);
      return dataFormatada;
    },
  },
  {
    name: "cpf",
    required: true,
    label: "CPF",
    align: "center",
    field: (linha) => {
      const { cpf } = linha;
      let cpfFormatado = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"); // expressão regular para formatar o cpf
      return cpfFormatado;
    },
  },
  {
    name: "acoes",
    label: "Ações",
    align: "center",
    field: "acoes",
  },
];

const rows = ref([]);

async function buscaDados() {
  const { data } = await api.get("/aluno");
  console.log(data);
  rows.value = data;
}

async function deleteAluno(id) {
  // console.log("Deletando o Aluno: ", id);

  $q.dialog({
    title: "Tem certeza que deseja excluir esse Aluno?",
    message: "Ao confirmar essa ação, você não poderá desfazêl-a.",
    cancel: true,
    persistent: true,
    ok: "Sim, excluir",
    cancel: "Cancelar",
    style: "text-align: center",
  })
    .onOk(async () => {
      const aluno = await api.delete(`/aluno/${id}`); // apaga o aluno

      $q.notify({
        type: "negative",
        message: "Aluno excluído com sucesso!",
        timeout: 1000,
        position: "top",
      });
      buscaDados();
    })
    .onCancel(() => {
      console.log("Cancelando a excluição do Aluno: ", id);
    });
}

async function editAluno(id) {
  // console.log("Editar o Aluno: ", id);
  router.push(`/editar-aluno/${id}`);
}

async function ModuleAluno(id) {
  router.push(`/modulos/${id}`);

}

function addAluno() {
  router.push("/cadastro-aluno");
}
onMounted(() => {
  buscaDados();
});
</script>

<style scoped></style>
