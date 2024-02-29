<template>
  <q-page class="q-ma-lg">
    <div class="row justify-evenly no-padding my-card text-white">
      <q-card class="col my-cards bg-cyan-8" style="max-width: 350px;" >
        <q-card-section class=" text-center text-h6" >
          <q-icon name="school" class="absolute-left q-pa-sm" />
          <p>{{ totalAlunos }}</p>
          <p>Alunos cadastrados</p>
        </q-card-section>
      </q-card>

      <q-card class="col my-cards" style="max-width: 350px;">
        <q-card-section class="bg-indigo-8 text-center text-h6">
          <q-icon name="folder" class="absolute-left q-pa-sm" />
          <p>{{ totalModulos }}</p>
          <p>Módulos cadastrados</p>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios';
import { ref, onMounted } from 'vue';

const totalModulos = ref(0);
const totalAlunos = ref(0);

onMounted( async() => {
  const modulos = await api.get(`modulos/total`);
  totalModulos.value = modulos.data;

  const alunos = await api.get(`alunos/total`);
  totalAlunos.value = alunos.data;
})

</script>

<style scoped>
.my-cards {
  cursor: pointer;
  transition: .3s;
}

.my-cards:hover {
  opacity: 0.8;
}

@media screen and (max-width: 800px) {
  .my-card {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .my-cards {
    width: 300px;
    margin-bottom: 30px;
  }
}
</style>
