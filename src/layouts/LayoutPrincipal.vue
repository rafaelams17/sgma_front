<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Sistema de Gerenciamento de Módulos Administrativos
        </q-toolbar-title>

        <div>Seja-bem vindo</div>
        <!--Name não funciona ainda-->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="200"
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
    >
      <q-item-section class="q-ma-md">SGMA</q-item-section>
      <q-list>
        <LinkEssenciais
          v-for="link in linkessenciais"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-footer elevated class="text-center">
      <div id="footer">Desenvolvido por Rafaela</div>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import LinkEssenciais from "src/components/LinkEssenciais.vue";

const linksList = [
  {
    title: "Home",
    icon: "dashboard",
    route: "/",
  },
  {
    title: "Alunos",
    icon: "school",
    route: "/alunos", // rota definida corretamente agora
  }
];

export default defineComponent({
  name: "LayoutPrincipal",

  components: {
    LinkEssenciais,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      miniState: ref(true),
      linkessenciais: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style scoped>
#footer {
  font-size: 16px;
}
</style>
