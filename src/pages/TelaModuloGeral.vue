<template>
  <div class="q-pa-md">
    <q-table
    title="Módulos"
    :rows="rows"
    :columns="columns"
    row-key="name"
    >
    <template v-slot:top>
        <q-btn
          color="primary"
          :disable="loading"
          label="Adicionar Módulo"
          @click="addModulo"
        />
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { api } from "src/boot/axios";

const router = useRouter();
const route = useRoute();
const rows = ref([]);

const columns = [{
  name: 'nome',
  required: true,
  label: 'Nome do Módulo',
  align: 'left',
  field: 'nome',
}]

async function buscaDados() {
  const modulos = await api.get("/modulo"); // rota para a api pegar os módulos cadastrados

  rows.value = modulos.data;
}

function addModulo() {
  router.push("/cadastrar-modulo");
}

onMounted(async () => {
  await buscaDados();
});
</script>
