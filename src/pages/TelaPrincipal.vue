<template>
  <q-page>
    <!-- <q-toolbar-title>Teste Dashboard</q-toolbar-title> -->
    <div class="dados" style="margin-left: 250px">
      <q-card class="my-card bg-purple text-white">
        <q-card-section>
          <div class="text-h6">
            <q-icon size="md" name="person" />
            <span> Alunos cadastrados</span>
          </div>
          <div class="text-h6">
            <p style="text-indent: 1.5em;">{{ totalAlunos }}</p>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="dados">
      <q-card class="my-card bg-amber text-white">
        <q-card-section>
          <div class="text-h6">
            <q-icon size="md" name="folder" />
            <span> Módulos cadastrados</span>
          </div>
          <div class="text-h6">
            <p style="text-indent: 1.5em;">{{ totalModulos }}</p>
          </div>
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
  const modulos = await api.get(`modulo/total`);
  totalModulos.value = modulos.data;

  const alunos = await api.get(`aluno/total`);
  totalAlunos.value = alunos.data;
})

</script>

<style scoped>
.dados {
  margin: 20px;
  margin-top: 50px;
  width: 500px;
  display: inline-block;
}
</style>
