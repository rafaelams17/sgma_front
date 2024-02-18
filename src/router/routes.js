const routes = [
  {
    path: "/",
    component: () => import("pages/login/PageLogin.vue"),
  },
  {
    path: "/dashboard",
    component: () => import("layouts/LayoutPrincipal.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/PageDashboard.vue"),
      },
      {
        path: "/alunos",
        component: () => import("pages/alunos/PageAlunos.vue"),
      },
      {
        path: "/cadastro-aluno",
        component: () => import("pages/alunos/AdicionarAlunos.vue"),
      },
      {
        path: "/editar-aluno/:id",
        component: () => import("pages/alunos/EditarAlunos.vue"),
      },
      {
        path: "/modulos/:id",
        component: () => import("pages/modulos/PageModulos.vue"),
      },
      {
        path: "/cadastro-modulo/:id",
        component: () => import("pages/modulos/AdicionarModulos.vue"),
      },
      {
        path: "/editar-modulo/:id",
        component: () => import("pages/modulos/EditarModulos.vue"),
      },
    ],
  },
  
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
