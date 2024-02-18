<template>
  <p class="nome-aluno">Aluno(a): {{ nomeAluno }}</p>
  <div class="q-pa-md">
    <q-table
      title="Módulo"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
      >
    <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge :color="mudarCor(props.value)">
            {{ props.row.status }}
          </q-badge>
        </q-td>
      </template>
      <template v-slot:top>
        <q-btn
          color="primary"
          :disable="loading"
          label="Adicionar Módulo"
          @click="addModulo"
        />
        <q-space />
        <q-input
          filled
          borderless
          dense
          debounce="300"
          color="primary"
          v-model="filter"
          label="Pesquisar"
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
            icon="edit"
            class="q-mx-sm q-px-sm"
            title="Editar Módulo"
            color="orange-8"
            @click="editModulo(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
    <div class="q-mt-md">
      <q-btn
        icon="arrow_back"
        color="primary"
        label="Voltar"
        @click="voltar()"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import { api } from "src/boot/axios";
import routes from "src/router/routes";

const router = useRouter();
const route = useRoute();
const $q = useQuasar();
const search = ref("");
const id = route.params.id;
const rows = ref([]);
const loading = ref(false);
const filter = ref("");
const nomeAluno = ref("");

const columns = [
  {
    name: "nome",
    required: true,
    label: "Nome do Módulo",
    align: "left",
    field: "nome",
  },
  {
    name: "nota1",
    required: true,
    label: "Nota 1",
    align: "center",
    field: "nota1",
  },
  {
    name: "nota2",
    required: true,
    label: "Nota 2",
    align: "center",
    field: "nota2",
  },
  {
    name: "nota3",
    required: true,
    label: "Nota 3",
    align: "center",
    field: "nota3",
  },
  {
    name: "status",
    label: "Status",
    align: "center",
    field: "status",
  },
  {
    name: "acoes",
    label: "Ações",
    align: "center",
    field: "acoes",
  },
];

async function buscaDados(id) {
  const aluno = await api.get(`/aluno/unico/${id}`); // rota para a api pegar o aluno para o módulo

  nomeAluno.value = aluno.data.nome;

  const modulos = await api.get(`/modulo/aluno/${id}`); // rota para a api pegar o módulo para o aluno

  rows.value = modulos.data;
}

function addModulo() {
  router.push(`/cadastro-modulo/${id}`);
}

function editModulo(id) {
  console.log("Editando o Aluno...");
  router.push(`/editar-modulo/${id}`);
}

async function mediaAluno() {
  rows.value.forEach((value, index) => { // forEach()?
    const media = ref(0);
    media.value =
      (Number(value.nota1) + Number(value.nota2) + Number(value.nota3)) / 3;

    if (value.nota1 === null || value.nota2 === null || value.nota3 === null) {
      rows.value[index] = { ...rows.value[index], status: "Incompleto" };
    } else if (media.value >= 5) {
      rows.value[index] = { ...rows.value[index], status: "Apto" }; //operador ... spread
    } else if (media.value < 5) {
      rows.value[index] = { ...rows.value[index], status: "Inapto" };
    }
  });
}

function mudarCor(status) {
  if(status == 'Apto'){
    return 'green-14';
  }
  if(status == 'Inapto'){
    return 'red-14';
  }
  if(status == 'Incompleto') {
    return 'deep-purple-14'
  }
}

function voltar() {
  //console.log("Voltar para página Módulos");
  router.push("/alunos");
}

onMounted(async () => {
  await buscaDados(id);
  mediaAluno();
});
</script>

<style scoped>
.nome-aluno {
  margin-top: 20px;
  margin-bottom: -10px;
  text-indent: 2em;
  font-size: 16px;
}
</style>
