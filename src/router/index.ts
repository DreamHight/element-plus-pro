import { createRouter, createWebHashHistory, createWebHistory, type Router, type RouteRecordRaw } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useDocumentTitle } from "@/hooks/use-document-title";
// import { defineAsyncComponent } from "vue";

// const basicRoutes: RouteRecordRaw[] = [
const basicRoutes: Array<RouteRecordRaw> = [
  {
    path: "/basic-form",
    name: "basicForm",
    meta:{
      title: "基础表单",
    },
    // component: defineAsyncComponent(() => import('@/views/form/basic-form.vue')),
    component: () => import(/* webpackChunkName: "basicForm" */ "../views/form/basic-form.vue"),
  },
  {
    path: "/step-form",
    name: "stepForm",
    meta:{
      title: "分步表单",
    },
    // component: defineAsyncComponent(() => import('../views/form/step-form.vue')),
    component: () => import(/* webpackChunkName: "stepForm" */ "../views/form/step-form.vue"),
  },
  {
    path: "/advanced-form",
    name: "advancedForm",
    meta:{
      title: "高级表单",
    },
    // component: defineAsyncComponent(() => import('../views/form/advanced-form.vue')),
    component: () => import(/* webpackChunkName: "advancedForm" */ "../views/form/advanced-form.vue"),
  },

  {
    path: "/list/search/articles",
    name: "searchArticles",
    meta:{
      title: "搜索列表（文章）",
    },
    // component: defineAsyncComponent(() => import('../views/table/search-articles.vue')),
    component: () => import(/* webpackChunkName: "searchArticles" */ "../views/table/search-articles.vue"),
  },
  {
    path: "/list/search/projects",
    name: "searchProjects",
    meta:{
      title: "搜索列表（项目）",
    },
    // component: defineAsyncComponent(() => import('../views/table/search-projects.vue')),
    component: () => import(/* webpackChunkName: "searchProjects" */ "../views/table/search-projects.vue"),
  },
  {
    path: "/list/search/applications",
    name: "searchApplications",
    meta:{
      title: "搜索列表（应用）",
    },
    // component: defineAsyncComponent(() => import('../views/table/search-applications.vue')),
    component: () => import(/* webpackChunkName: "searchApplications" */ "../views/table/search-applications.vue"),
  },
  {
    path: "/list/table-list",
    name: "tableList",
    meta:{
      title: "查询表格",
    },
    // component: defineAsyncComponent(() => import('../views/table/table-list.vue')),
    component: () => import(/* webpackChunkName: "tableList" */ "../views/table/table-list.vue"),
  },
  {
    path: "/list/tree-table",
    name: "treeTable",
    meta:{
      title: "查询表格",
    },
    // component: defineAsyncComponent(() => import('../views/table/tree-table.vue')),
    component: () => import(/* webpackChunkName: "treeTable" */ "../views/table/tree-table.vue"),
  },
  {
    path: "/list/basic-list",
    name: "basicList",
    meta:{
      title: "标准列表",
    },
    // component: defineAsyncComponent(() => import('../views/table/basic-list.vue')),
    component: () => import(/* webpackChunkName: "basicList" */ "../views/table/basic-list.vue"),
  },
  {
    path: "/list/card-list",
    name: "cardList",
    meta:{
      title: "卡片列表",
    },
    // component: defineAsyncComponent(() => import('../views/table/card-list.vue')),
    component: () => import(/* webpackChunkName: "cardList" */ "../views/table/card-list.vue"),
  },

  {
    path: "/profile/basic-detail",
    name: "basicDetail",
    meta:{
      title: "基础详情页",
    },
    // component: defineAsyncComponent(() => import('../views/profile/basic-detail.vue')),
    component: () => import(/* webpackChunkName: "basicDetail" */ "../views/profile/basic-detail.vue"),
  },
  {
    path: "/profile/advanced-detail",
    name: "advancedDetail",
    meta:{
      title: "基础详情页",
    },
    // component: defineAsyncComponent(() => import('../views/profile/advanced-detail.vue')),
    component: () => import(/* webpackChunkName: "advancedDetail" */ "../views/profile/advanced-detail.vue"),
  },

  {
    path: "/success",
    name: "resultSuccess",
    meta:{
      title: "成功页",
    },
    // component: defineAsyncComponent(() => import('../views/result/success.vue')),
    component: () => import(/* webpackChunkName: "result" */ "../views/result/success.vue"),
  },
  {
    path: "/fail",
    name: "resultFail",
    meta:{
      title: "失败页",
    },
    // component: defineAsyncComponent(() => import('../views/result/fail.vue')),
    component: () => import(/* webpackChunkName: "result" */ "../views/result/fail.vue"),
  },

  {
    path: "/403",
    name: "exception403",
    meta:{
      title: "403",
    },
    // component: defineAsyncComponent(() => import('../views/exception/403.vue')),
    component: () => import(/* webpackChunkName: "exception" */ "../views/exception/403.vue"),
  },
  // {
  //   path: "/404",
  //   name: "exception404",
  //   meta:{
  //     title:"404",
  //   },
  //   component: () => import(/* webpackChunkName: "exception" */ "../views/exception/404.vue"),
  // },
  {
    path: "/500",
    name: "exception500",
    meta:{
      title: "500",
    },
    // component: defineAsyncComponent(() => import('../views/exception/500.vue')),
    component: () => import(/* webpackChunkName: "exception" */ "../views/exception/500.vue"),
  },
  // {
  //   path: "/",
  //   name: "layout",
  //   meta:{
  //     title: "布局",
  //   },
  //   component: () => import(/* webpackChunkName: "layout" */ "../components/ProLayout/BasicLayout.vue"),
  // },
  {
    path: "/index",
    name: "home",
    meta:{
      title: "首页",
    },
    // component: defineAsyncComponent(() => import('../views/home/index.vue')),
    component: () => import(/* webpackChunkName: "home" */ "../views/home/index.vue"),
  },
  {
    path: "/iframe-vuejs",
    name: "vuejs",
    meta:{
      title: "iframe-vuejs",
      link: "https://cn.vuejs.org/",
    },
    component: () => import("../views/iframe/iframe.vue"),
  },
  {
    path: "/iframe-elementPlus",
    name: "elementPlus",
    meta:{
      title: "iframe-elementPlus",
      link: "https://element-plus.org/zh-CN/",
    },
    component: () => import("../views/iframe/iframe.vue"),
  },
  {
    path: "/link-vuejs",
    name: "link-vuejs",
    meta:{
      title: "外链-vuejs",
    },
    component: () => import("../views/link/link.vue"),
  },
  {
    path: "/link-elementPlus",
    name: "link-elementPlus",
    meta:{
      title: "外链-elementPlus",
    },
    component: () => import("../views/link/link.vue"),
  },

  {
    path: "/extension/custom-icon",
    name: "customIcon",
    meta:{
      title: "自定义图标",
    },
    // component: defineAsyncComponent(() => import('../views/extension/custom-icon.vue')),
    component: () => import(/* webpackChunkName: "customIcon" */ "../views/extension/custom-icon.vue"),
  },
  {
    path: "/extension/check-card",
    name: "checkCard",
    meta:{
      title: "多选卡片",
    },
    // component: defineAsyncComponent(() => import('../views/extension/check-card.vue')),
    component: () => import(/* webpackChunkName: "checkCard" */ "../views/extension/check-card.vue"),
  },
  {
    path: "/extension/grid-layout",
    name: "gridLayout",
    meta:{
      title: "Grid布局",
    },
    // component: defineAsyncComponent(() => import('../views/extension/grid-layout.vue')),
    component: () => import(/* webpackChunkName: "gridLayout" */ "../views/extension/grid-layout.vue"),
  },
  {
    path: "/extension/clip-board",
    name: "clipBoard",
    meta:{
      title: "ClipBoard",
    },
    // component: defineAsyncComponent(() => import('../views/extension/clip-board.vue')),
    component: () => import(/* webpackChunkName: "clipBoard" */ "../views/extension/clip-board.vue"),
  },
  {
    path: "/extension/avatar-group",
    name: "avatarGroup",
    meta:{
      title: "头像组",
    },
    // component: defineAsyncComponent(() => import('../views/extension/avatar-group.vue')),
    component: () => import(/* webpackChunkName: "avatarGroup" */ "../views/extension/avatar-group.vue"),
  },
  {
    path: "/extension/card-list",
    name: "cardListComponent",
    meta:{
      title: "CardListComponent",
    },
    // component: defineAsyncComponent(() => import('../views/extension/card-list.vue')),
    component: () => import(/* webpackChunkName: "cardListComponent" */ "../views/extension/card-list.vue"),
  },
  {
    path: "/extension/pulse-dot",
    name: "pulseDot",
    meta:{
      title: "PulseDot",
    },
    // component: defineAsyncComponent(() => import('../views/extension/pulse-dot.vue')),
    component: () => import(/* webpackChunkName: "pulseDot" */ "../views/extension/pulse-dot.vue"),
  },
  {
    path: "/extension/tags-view",
    name: "tagsView",
    meta:{
      title: "TagsView",
    },
    // component: defineAsyncComponent(() => import('../views/extension/tags-view.vue')),
    component: () => import(/* webpackChunkName: "tagsView" */ "../views/extension/tags-view.vue"),
  },

  {
    path: "/table-template",
    name: "tableTemplate",
    meta:{
      title: "表格模板",
    },
    // component: defineAsyncComponent(() => import('../views/template/table-template.vue')),
    component: () => import(/* webpackChunkName: "tableTemplate" */ "../views/template/table-template.vue"),
  },

  {
    path: "/about",
    name: "about",
    meta:{
      title: "关于",
    },
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/home-view",
    name: "home-view",
    meta:{
      title: "HomeView",
    },
    component: () => import("../views/HomeView.vue"),
  },
  // {
  //   path: "/dynamic", // 动态路由模块
  //   name: "dynamic",
  //   component: Layout,
  //   children: [],
  // },
]
const router: Router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), // createWebHistory(import.meta.env.BASE_URL),
  routes: basicRoutes,
  // routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: HomeView,
    // },
    // {
    //   path: "/about",
    //   name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  // ],
});

const notFoundRoute: RouteRecordRaw = {
  path: "/:pathMatch(.*)",
  // name: "not-found",
  // redirect: "/404",
  name: "exception404",
  meta:{
    title: "404",
  },
  component: () => import(/* webpackChunkName: "exception" */ "../views/exception/404.vue"),
};

// 生成动态路由
const dynamicRoutes: RouteRecordRaw[] = [];

function generateRoute() {
  dynamicRoutes.forEach(route => {
    router.addRoute(route);
  });
  router.addRoute(notFoundRoute);
}
generateRoute();
// window.addEventListener('popstate', (event) => {
//   console.log('State:', event.state);
//   // 根据state更新页面内容
// });
window.addEventListener('hashchange', (event) => {
  console.log('State:', event);
  console.log('Old URL:', event.oldURL);
  console.log('New URL:', event.newURL);
  // 根据hash变化更新页面内容
  // window.location.hash = 'index';
});

// 根据路由进度设置 document title
function routeProgress(nRouter: Router): void {
  // const whiteList = ["/404", "/500", "/login", "/register"]; // 定义白名单

  // NProgress.inc(0.2) // 设置初始进度
  // NProgress.configure({ showSpinner: false }) // 配置动画选项

  // 定义全局前置守卫
  nRouter.beforeEach((to, from, next) => {
    // if (to.matched.some(record => record.meta.requiresAuth)) {
      // 这里假设用户的角色是 "admin"
    //   if (currentUser.role !== "admin") {
        // 如果当前用户不是管理员，则跳转到403页面
    //     next("/403")
    //   } else {
    //     next() // 否则，正常继续
    //   }
    // } else {
    //   next() // 正常继续
    // }

    // const hasRoute = router.hasRoute(to.path);
    // if (!hasRoute) {
    // // next({ name: "exception404", replace: true }); 或
    //   next({ name: "NotFound", replace: true });
    // } else {
    //   next();
    // }

    // 路由进入前，设置加载状态为true
    NProgress.start();
    next();
  });
  // 定义全局后置钩子
  nRouter.afterEach((to, from, next) => {
    // 路由进入后，设置加载状态为false
    NProgress.done();

    const documentTitle: string = to.meta.title as string;
    useDocumentTitle(documentTitle);
  });
}
routeProgress(router);

// 添加全局错误处理钩子
router.onError((error) => {
  // 检查错误是否为500
  if (error.message === "500") {
    // 进行路由跳转到你的500错误页面
    router.push("/500");
  }
});

export default router;
