const routes = [
  {
    path: "/",
    component: () => import("layouts/LayoutLogin.vue"),
    children: [
      {
        path: "", 
        component: () => import("pages/usuarios/PageLogin.vue")
      },
      {
        path: "/cadastro-usuario", 
        component: () => import("pages/usuarios/CadastroUsuario.vue")
      },
      {
        path: "/esqueceu-senha", 
        component: () => import("pages/usuarios/EsqueceuSenhaUsuario.vue")
      }
    ],
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
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
