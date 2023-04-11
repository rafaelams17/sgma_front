const routes = [
  {
    path: "/",
    component: () => import("layouts/LayoutPrincipal.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/TelaPrincipal.vue"),
      },
      {
        path: "/alunos",
        component: () => import("pages/TelaAluno.vue"),
      },
      {
        path: "/modulos/:id",
        component: () => import("pages/TelaModulo.vue"),
      },
      {
        path: "/cadastro-aluno",
        component: () => import("components/form/FormAluno.vue"),
      },
      {
        path: "/cadastro-modulo/:id",
        component: () => import("components/form/FormModulo.vue"),
      },
      {
        path: "/editar-aluno/:id",
        component: () => import("components/formEditar/FormEditAluno.vue"),
      },
      {
        path: "/editar-modulo/:id",
        component: () => import("components/formEditar/FormEditModulo.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("pages/TelaLogin.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
