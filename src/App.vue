<template>
  <!-- <RouterView /> -->

  <!-- tmix布局 -->
  <BasicLayout
    :header-props="headerProps"
    :tags-view-props="tagsViewProps"
    :aside-props="asideProps"
    :active-route="activeRoute"
  />

  <!-- side布局 -->
  <!-- <BasicLayout
    :logo-props="logoProps"
    :header-props="headerProps"
    :tags-view-props="tagsViewProps"
    :aside-props="asideProps"
    :active-route="activeRoute"
  /> -->

  <!-- top布局 -->
  <!-- <BasicLayout
    :header-props="headerProps"
    :breadcrumb-props="breadcrumbProps"
    :tags-view-props="tagsViewProps"
    :aside-props="asideProps"
    :active-route="activeRoute"
  /> -->

  <ConfigStyle @switch-change="switchChangeHandler" />
</template>

<script setup lang="ts">
// import { RouterLink, RouterView } from "vue-router";
import BasicLayout from "@/components/ProLayout/BasicLayout.vue";
import ConfigStyle from '@/components/ConfigStyle/ConfigStyle.vue';
import Logo from '@/assets/logo.svg';
import ElementLogo from '@/assets/element_logo.jpg';
import ViteLogo from '@/assets/vite_logo.jpg';
import type { IAppList, IAsideProps, ISystemList } from "@/components/typings/aside";
// import {
//   Box,
//   CircleCheck,
//   Edit,
//   Grid,
//   House,
//   Link,
//   Location,
//   Odometer,
//   Tickets,
//   Warning,
// } from '@element-plus/icons-vue';
import type { IMenuItem } from '@/components/typings/menu';
import avatar from '@/assets/avatar.png';
import { useRouter, type Router } from 'vue-router';
import type { IHeaderProps } from './components/typings/header';
import globalSetting from './global';
import type { ILogoProps } from './components/typings/logo';
import { onMounted, reactive, ref, shallowRef } from 'vue';
import {
  recursionToGetMenuItems,
  recursionToGetTopMenusWithout,
  recursionToGetTopMenus
} from './components/MenuSearch';
import type { IBreadcrumbItem, IBreadcrumbProps } from './components/typings/breadcrumb';
import type { IAsideBottom, IAsideBottomProps } from './components/typings/asideBottom';
import type { IAsideTopProps } from './components/typings/asideTop';
import type { IMainProps } from "./components/typings/main";
import type { ITagsViewProps } from "./components/typings/tagsView";
import type { ISwitchSetting } from "./components/typings/configStyle";

const router: Router = useRouter();

const appList: IAppList[] = [
  // {
  //   src: Logo,
  //   alt: 'Vue.js',
  //   tooltip: 'Vue.js直达',
  //   href: 'https://cn.vuejs.org/',
  // },
  {
    // icon: 'Box',
    // color: '#ff0000',
    src: ElementLogo,
    alt: 'Element Plus',
    name: '示例',
    tooltip: 'Element Plus直达',
    href: 'https://element-plus.org/zh-CN/',
  },
  {
    src: ViteLogo,
    alt: 'Vite',
    name: 'Vite',
    tooltip: 'Vite直达',
  },
];
const systemList: ISystemList[] = [
  {
    route: '',
    tooltip: '个人中心',
    icon: 'User',
    // click: () => {
    //   alert('this is User.');
    // },
  },
  {
    route: '/success',
    icon: 'Setting',
  },
];
function appListClickHandler(item: IAppList): void {
  if (item.href) {
    router.push(item.href);
  } else {
    alert('this is Vite.');
  }
}
function systemListClickHandler(item: ISystemList): void {
  if (item.route) {
    router.push(item.route);
  } else {
    alert('this is User.');
  }
}

function asideTopCommandHandler(collapse: boolean): void {
  console.log('asideTopCommandHandler', collapse);
}
const asideTopProps: IAsideTopProps = {
  onCommand: asideTopCommandHandler,
}

const asideBottomDropdownMenu: IAsideBottom[] = [
  {
    index: '/403',
    title: '个人中心',
    icon: 'User',
  },
  {
    index: '/404',
    title: '个人设置',
    icon: 'Setting',
  },
  {
    index: '/500',
    title: '退出登录',
    divided: true,
    icon: 'SwitchButton',
  },
];
function asideBottomCommandHandler(item: IAsideBottom): void {
  router.push(item.index);
}
const asideBottomProps: IAsideBottomProps = {
  avatarSrc: avatar,
  nickName: 'Serati Ma',
  description: '15113329055',
  dropdownMenu: asideBottomDropdownMenu,
  onCommand: asideBottomCommandHandler,
}

const menuTree: IMenuItem[] = [
  {
    id: '1',
    parentId: null,
    index: 'dashboard',
    title: '仪表盘',
    icon: 'Odometer',
    componentType: 'el-badge',
    componentProps: {
      // offset: [0, 15],//[65, 28],
      value: 100,
    },
    children: [
      {
        id: '11',
        parentId: '1',
        index: '/dashboard/analysis',
        title: '分析页',
        pinyin: 'fenxiye',
        // route: '/about',
        // icon: Odometer,
        componentType: 'el-badge',
        componentProps: {
          offset: [100, 18], // [100, 25],
          value: 100,
        },
      },
      {
        id: '12',
        parentId: '1',
        index: '/dashboard/monitor',
        title: '监控页',
        pinyin: 'jiankongye',
        componentType: 'el-badge',
        componentProps: {
          offset: [110, 18], // [110, 25],
          'is-dot': true,
        },
      },
      {
        id: '13',
        parentId: '1',
        index: '/dashboard/workplace',
        title: '工作台',
        pinyin: 'gongzuotai',
        componentType: 'el-tag',
        componentProps: {
          type: 'warning',
          size: 'small',
          defaultSlot: 'Email',
        },
      },
    ],
  },
  {
    id: '2',
    parentId: null,
    index: '2',
    title: '表单页',
    icon: 'Edit',
    children: [
      {
        id: '21',
        parentId: '2',
        index: '/basic-form',
        title: '基础表单',
      },
      {
        id: '22',
        parentId: '2',
        index: '/step-form',
        title: '分步表单',
      },
      {
        id: '23',
        parentId: '2',
        index: '/advanced-form',
        title: '高级表单',
      },
    ],
  },
  {
    id: '3',
    parentId: null,
    index: '3',
    title: '列表页',
    icon: 'Grid',
    children: [
      {
        id: '31',
        parentId: '3',
        index: '3-1',
        title: '搜索列表',
        children: [
          {
            id: '311',
            parentId: '31',
            index: '/list/search/articles',
            title: '搜索列表（文章）',
          },
          {
            id: '312',
            parentId: '31',
            index: '/list/search/projects',
            title: '搜索列表（项目）',
          },
          {
            id: '313',
            parentId: '31',
            index: '/list/search/applications',
            title: '搜索列表（应用）',
          },
        ],
      },
      {
        id: '32',
        parentId: '3',
        index: '/list/table-list',
        title: '查询表格',
      },
      {
        id: '33',
        parentId: '3',
        index: '/list/tree-table',
        title: '左树右表',
      },
      {
        id: '34',
        parentId: '3',
        index: '/list/basic-list',
        title: '标准列表',
      },
      {
        id: '35',
        parentId: '3',
        index: '/list/card-list',
        title: '卡片列表',
      },
    ],
  },
  {
    id: '4',
    parentId: null,
    index: 'detail',
    title: '详情页',
    icon: 'Tickets',
    children: [
      {
        id: '41',
        parentId: '4',
        index: '/profile/basic-detail',
        title: '基础详情页',
      },
      {
        id: '42',
        parentId: '4',
        index: '/profile/advanced-detail',
        title: '高级详情页',
      },
    ],
  },
  {
    id: '5',
    parentId: null,
    index: 'result',
    title: '结果页',
    icon: 'CircleCheck',
    children: [
      {
        id: '51',
        parentId: '5',
        index: '/success',
        route: '/success',
        title: '成功页',
      },
      {
        id: '52',
        parentId: '5',
        index: '/fail',
        route: '/fail',
        title: '失败页',
      },
    ],
  },
  {
    id: '6',
    parentId: null,
    index: 'exception',
    title: '异常页',
    icon: 'Warning',
    children: [
      {
        id: '61',
        parentId: '6',
        index: '/403',
        route: '/403',
        title: '403',
      },
      {
        id: '62',
        parentId: '6',
        index: '/404',
        route: '/404',
        title: '404',
      },
      {
        id: '63',
        parentId: '6',
        index: '/500',
        route: '/500',
        title: '500',
      },
    ],
  },
  {
    id: '7',
    parentId: null,
    index: 'user',
    title: '个人页',
    icon: 'User',
    children: [
      {
        id: '71',
        parentId: '7',
        index: '7-1',
        title: '个人中心',
      },
      {
        id: '72',
        parentId: '7',
        index: '7-2',
        title: '个人设置',
      },
    ],
  },
  {
    id: '8',
    parentId: null,
    index: globalSetting.homePath,
    route: globalSetting.homePath,
    title: '首页',
    icon: 'House',
  },
  {
    id: '9',
    parentId: null,
    index: '/iframe-vuejs',
    route: '/iframe-vuejs',
    title: 'iframe-vuejs',
    icon: 'Box',
  },
  {
    id: '10',
    parentId: null,
    index: '/iframe-elementPlus',
    route: '/iframe-elementPlus',
    title: 'iframe-elementPlus',
    icon: 'Box',
  },
  {
    id: '11',
    parentId: null,
    index: '/link-vuejs?target=https://cn.vuejs.org/',
    route: '/link-vuejs?target=https://cn.vuejs.org/',
    title: '外链-vuejs',
    icon: 'Link',
  },
  {
    id: '12',
    parentId: null,
    index: '/link-elementPlus?target=https://element-plus.org/zh-CN/',
    route: '/link-elementPlus?target=https://element-plus.org/zh-CN/',
    title: '外链-elementPlus',
    icon: 'Link',
  },
  {
    id: '13',
    parentId: null,
    index: 'extension',
    title: '自定义组件',
    icon: 'Document',
    children: [
      {
        id: '131',
        parentId: '13',
        index: '/extension/custom-icon',
        title: '自定义图标',
      },
      {
        id: '132',
        parentId: '13',
        index: '/extension/check-card',
        title: '多选卡片',
      },
      {
        id: '133',
        parentId: '13',
        index: '/extension/grid-layout',
        title: 'Grid布局',
      },
      {
        id: '134',
        parentId: '13',
        index: '/extension/clip-board',
        title: 'ClipBoard',
      },
      {
        id: '135',
        parentId: '13',
        index: '/extension/avatar-group',
        title: '头像组',
      },
      {
        id: '136',
        parentId: '13',
        index: '/extension/card-list',
        title: 'CardList',
      },
      {
        id: '137',
        parentId: '13',
        index: '/extension/pulse-dot',
        title: 'PulseDot',
      },
      {
        id: '138',
        parentId: '13',
        index: '/extension/tags-view',
        title: 'TagsView',
      },
    ],
  },
  {
    id: '14',
    parentId: null,
    index: 'template',
    title: '页面模板',
    icon: 'Collection',
    children: [
      {
        id: '141',
        parentId: '14',
        index: '/table-template',
        title: '表格模板',
      },
    ],
  },
  {
    id: '15',
    parentId: null,
    index: 'system',
    title: '系统管理',
    icon: 'Setting',
    children: [
      {
        id: '151',
        parentId: '15',
        index: '/user-management',
        title: '用户管理',
      },
      {
        id: '152',
        parentId: '15',
        index: '/role-management',
        title: '角色管理',
      },
      {
        id: '153',
        parentId: '15',
        index: '/menu-management',
        title: '菜单管理',
      },
      {
        id: '154',
        parentId: '15',
        index: '/organization-management',
        title: '机构管理',
      },
      {
        id: '155',
        parentId: '15',
        index: '/dictionary-management',
        title: '字典管理',
      },
      {
        id: '156',
        parentId: '15',
        index: '/file-management',
        title: '文件管理',
      },
      {
        id: '157',
        parentId: '15',
        index: '/login-record',
        title: '登录日志',
      },
      {
        id: '158',
        parentId: '15',
        index: '/operation-record',
        title: '操作日志',
      },
    ],
  },
  // {
  //   id: '10',
  //   parentId: null,
  //   index: '/link?target=https://www.baidu.com/',
  //   // index: 'https://www.baidu.com/',
  //   title: '外链',
  //   icon: Link,
  // },

  {
    id: '88',
    parentId: null,
    index: '88',
    title: '嵌套分组路由',
    icon: 'Location',
    children: [
      {
        id: '881',
        parentId: '88',
        index: '88-1',
        title: '嵌套路由1',
        icon: 'Location',
        children: [
          {
            id: '8811',
            parentId: '881',
            index: '88-1-1',
            title: '嵌套路由2',
            children: [
              {
                id: '88111',
                parentId: '8811',
                index: '88-1-1',
                title: '嵌套路由21',
              },
            ],
          },
          {
            id: '8812',
            parentId: '881',
            index: '88-2-1',
            title: '嵌套路由3',
            children: [
              {
                id: '88121',
                parentId: '8812',
                index: '88-2-1-1',
                title: '嵌套路由31',
              },
            ],
          },
        ],
      },
      {
        id: '882',
        parentId: '88',
        index: '88-2',
        title: '分组路由1',
        group: [
          {
            id: '8821',
            parentId: '882',
            index: 'g-1-1',
            title: '分组项1',
            componentType: 'el-icon',
            componentProps: {
              defaultSlot: 'Edit',
            },
          },
          {
            id: '8822',
            parentId: '882',
            index: 'g-1-2',
            title: '分组项2',
            componentType: 'el-button',
            componentProps: {
              type: 'warning',
              size: 'small',
              defaultSlot: 'Email',
            },
          },
        ]
      },
      {
        id: '883',
        parentId: '88',
        index: '88-3',
        title: '分组页2',
      },
      {
        id: '884',
        parentId: '88',
        index: '88-4',
        title: '分组页3',
      },
      {
        id: '885',
        parentId: '88',
        index: '88-5',
        title: '分组路由2',
        group: [
          {
            id: '8851',
            parentId: '885',
            index: 'g-2-1',
            title: '分组项1',
          },
          {
            id: '8852',
            parentId: '885',
            index: 'g-2-2',
            title: '分组项2',
          },
        ]
      },
    ],
  },
  {
    id: '99',
    parentId: null,
    index: '99',
    title: '禁用路由',
    icon: 'Location',
    disabled: true,
    componentType: 'el-icon',
    componentProps: {
      defaultSlot: 'Grid',
    },
  },
  {
    id: '100',
    parentId: null,
    index: '100',
    title: '分组',
    icon: 'Location',
    group: [
      {
        id: '101',
        parentId: '100',
        index: 'g-100-1',
        title: '分组项1',
        icon: 'Location',
      },
    ],
  },
];

const logoProps: ILogoProps = {
  showBottomBorder: true,
  // logoStyles: {
  //   padding: '0 10px',
  // },
  logoSrc: Logo,
  title: globalSetting.projectName,
};

function breadcrumbCommandHandler(item: IBreadcrumbItem): void {
  const index = item.to as string;
  router.push(index);
}
function menuItemClickHandler(link: string): void {
  router.push(link);
}

// mix布局
const headerProps = reactive<IHeaderProps>({
  logoProps: {
    logoStyles: {
      paddingRight: '54px',
    },
    logoSrc: Logo,
    title: globalSetting.projectName,
  },

  // breadcrumbProps: {
  //   showHistory: true,
  //   historyList: [
  //     {
  //       to: '/index',
  //       title: '首页',
  //     },
  //   ],
  //   menuTree,
  //   activeRoute: '',
  //   list: [],
  //   onCommand: breadcrumbCommandHandler,
  // },

  showHeaderMenu: true,
  menuProps: {
    menuTree,
  },

  // showMenuSearch: true,
  // menuSearchProps: {
  //   canHiddenXsOnly: true,
  //   menuTree,
  //   onItemClick: menuItemClickHandler,
  // },

  headerActions: [
    {
      icon: 'Lock',
      tooltip: '锁屏',
      className: 'hidden-xs-only',
    },
  ],

  darkThemeProps: {
    canHiddenXsOnly: true,
  },

  fullScreenProps: {
    canHiddenXsOnly: true,
  },

  messageDropdownProps: {
    canHiddenXsOnly: true,
    badgeProps: {
      value: 100,
    },
    list: [
      {
        label: '通知',
        count: '（1）',
        name: 'notification',
        list: [
          {
            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            title: '约翰.维尔逊回复了你的邮件约翰.维尔逊回复了你的邮件',
            subTitle: '2024-12-30 14:33:18',
            tag: null,
          },
        ],
        delete: '清空通知',
      },
      {
        label: '私信',
        count: '（2）',
        name: 'follow',
        list: [
          {
            avatar: Logo,
            title: '1约翰.维尔逊回复了你的邮件',
            subTitle: '2024-12-30 14:33:18',
            tag: null,
          },
          {
            avatar: Logo,
            title: '2约翰.维尔逊回复了你的邮件约翰.维尔逊回复了你的邮件',
            subTitle: '2024-12-30 14:33:18',
            tag: null,
          },
        ],
        delete: '清空私信',
      },
      {
        label: '待办',
        count: '（3）',
        name: 'todo',
        delete: '清空待办',
        list: [
          {
            avatar: '',
            title: '1约翰.维尔逊回复了你的邮件约翰.维尔逊回复了你的邮件',
            subTitle: '2024-12-30 14:33:18',
            tag: {
              type: 'primary',
              content: '进行中',
            },
          },
          {
            avatar: '',
            title: '2约翰.维尔逊回复了你的邮件约翰.维尔逊回复了你的邮件',
            subTitle: '2024-12-30 14:33:18',
            tag: {
              type: 'info',
              content: '未开始',
            },
          },
          {
            avatar: '',
            title: '3约翰.维尔逊回复了你的邮件',
            subTitle: '2024-12-30 14:33:18',
            tag: {
              type: 'danger',
              content: '即将到期',
            },
          },
        ],
      },
    ],
  },

  showLanguage: true,
  languageDropdownProps: {
    canHiddenXsOnly: true,
    // list: [],
    onCommand: (item: IAsideBottom) => {
      console.log('itemitem', item);
    }
  },

  userDropdownProps: {
    avatar: avatar,
    nickName: 'Serati Ma',
    canTextHiddenXsOnly: true,
    list: [
      {
        index: '/403',
        title: '个人中心',
        icon: 'User',
      },
      {
        index: '/404',
        title: '个人设置',
        icon: 'Setting',
      },
      {
        index: '/500',
        title: '修改密码',
        icon: 'Lock',
      },
      {
        index: '/login',
        title: '退出登录',
        divided: true,
        icon: 'SwitchButton',
      },
    ],
    onCommand: (item: IAsideBottom) => {
      console.log('itemitem', item);
      router.push(item.index);
    }
  },
});
const asideProps = shallowRef<IAsideProps>({
  showExtraAside: true,
  appList,
  systemList,
  menuProps: {
    showCycleSort: true,
    menuTree,
  },
  showAsideTop: true,
  asideTopProps,
  showAsideBottom: true,
  asideBottomProps,
  onAppListClick: appListClickHandler,
  onSystemListClick: systemListClickHandler,
});
const tagsViewProps = reactive<ITagsViewProps>({
  list: [
    {
      id: '8',
      parentId: null,
      index: globalSetting.homePath,
      title: '首页',
      icon: 'House',
    },
  ],
  showBottomBorder: true,
  showOperateMenu: true,
  showMaximize: true,
  menuTree,
  activeRoute: '',
  // onCommand: tagsViewClickHandler,
});

// side布局
// const headerProps = reactive<IHeaderProps>({
//   breadcrumbProps: {
//     showHistory: true,
//     historyList: [
//       {
//         to: '/index',
//         title: '首页',
//       },
//     ],
//     menuTree,
//     activeRoute: '',
//     list: [],
//     onCommand: breadcrumbCommandHandler,
//   },

//   headerActions: [
//     {
//       icon: 'Lock',
//       tooltip: '锁屏',
//       className: 'hidden-xs-only',
//     },
//   ],

//   darkThemeProps: {
//     canHiddenXsOnly: true,
//   },

//   fullScreenProps: {
//     canHiddenXsOnly: true,
//   },

//   messageDropdownProps: {
//     canHiddenXsOnly: true,
//     badgeProps: {
//       value: 100,
//     },
//     list: [
//       {
//         label: '通知',
//         count: '（1）',
//         name: 'notification',
//         list: [
//           {
//             avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
//             title: '约翰.维尔逊回复了你的邮件约翰.维尔逊回复了你的邮件',
//             subTitle: '2024-12-30 14:33:18',
//             tag: null,
//           },
//         ],
//         delete: '清空通知',
//       },
//       {
//         label: '私信',
//         count: '（2）',
//         name: 'follow',
//         list: [
//           {
//             avatar: Logo,
//             title: '1约翰.维尔逊回复了你的邮件',
//             subTitle: '2024-12-30 14:33:18',
//             tag: null,
//           },
//           {
//             avatar: Logo,
//             title: '2约翰.维尔逊回复了你的邮件约翰.维尔逊回复了你的邮件',
//             subTitle: '2024-12-30 14:33:18',
//             tag: null,
//           },
//         ],
//         delete: '清空私信',
//       },
//       {
//         label: '待办',
//         count: '（3）',
//         name: 'todo',
//         delete: '清空待办',
//         list: [
//           {
//             avatar: '',
//             title: '1约翰.维尔逊回复了你的邮件约翰.维尔逊回复了你的邮件',
//             subTitle: '2024-12-30 14:33:18',
//             tag: {
//               type: 'primary',
//               content: '进行中',
//             },
//           },
//           {
//             avatar: '',
//             title: '2约翰.维尔逊回复了你的邮件约翰.维尔逊回复了你的邮件',
//             subTitle: '2024-12-30 14:33:18',
//             tag: {
//               type: 'info',
//               content: '未开始',
//             },
//           },
//           {
//             avatar: '',
//             title: '3约翰.维尔逊回复了你的邮件',
//             subTitle: '2024-12-30 14:33:18',
//             tag: {
//               type: 'danger',
//               content: '即将到期',
//             },
//           },
//         ],
//       },
//     ],
//   },

//   showLanguage: true,
//   languageDropdownProps: {
//     canHiddenXsOnly: true,
//     // list: [],
//     onCommand: (item: IAsideBottom) => {
//       console.log('itemitem', item);
//     }
//   },

//   userDropdownProps: {
//     avatar: avatar,
//     nickName: 'Serati Ma',
//     canTextHiddenXsOnly: true,
//     list: [
//       {
//         index: '/403',
//         title: '个人中心',
//         icon: 'User',
//       },
//       {
//         index: '/404',
//         title: '个人设置',
//         icon: 'Setting',
//       },
//       {
//         index: '/500',
//         title: '修改密码',
//         icon: 'Lock',
//       },
//       {
//         index: '/login',
//         title: '退出登录',
//         divided: true,
//         icon: 'SwitchButton',
//       },
//     ],
//     onCommand: (item: IAsideBottom) => {
//       console.log('itemitem', item);
//       router.push(item.index);
//     }
//   },
// });
// const asideProps = shallowRef<IAsideProps>({
//   showExtraAside: true,
//   appList,
//   systemList,
//   menuProps: {
//     menuTree,
//     onMenuItemClick: menuItemClickHandler,
//   },
//   showAsideTop: true,
//   asideTopProps,
//   showAsideBottom: true,
//   asideBottomProps,
//   onAppListClick: appListClickHandler,
//   onSystemListClick: systemListClickHandler,
// });
// const tagsViewProps = reactive<ITagsViewProps>({
//   list: [
//     {
//       id: '8',
//       parentId: null,
//       index: globalSetting.homePath,
//       title: '首页',
//       icon: 'House',
//     },
//   ],
//   showBottomBorder: true,
//   showOperateMenu: true,
//   showMaximize: true,
//   menuTree,
//   activeRoute: '',
//   // onCommand: tagsViewClickHandler,
// });

// top布局
// const headerProps = reactive<IHeaderProps>({
//   sticky: true,

//   logoProps: {
//     logoSrc: Logo,
//     title: globalSetting.projectName,
//   },

//   showHeaderMenu: true,
//   menuProps: {
//     menuTree,
//   },

//   showMenuSearch: true,
//   menuSearchProps: {
//     canHiddenXsOnly: true,
//     menuTree,
//     onItemClick: menuItemClickHandler,
//   },
//   // onMenuItemClick: menuItemClickHandler,

//   headerActions: [
//     {
//       icon: 'Lock',
//       tooltip: '锁屏',
//       className: 'hidden-xs-only',
//     },
//   ],

//   darkThemeProps: {
//     canHiddenXsOnly: true,
//   },

//   fullScreenProps: {
//     canHiddenXsOnly: true,
//   },

//   messageDropdownProps: {
//     canHiddenXsOnly: true,
//     badgeProps: {
//       value: 100,
//     },
//     list: [
//       {
//         label: '通知',
//         count: '（1）',
//         name: 'notification',
//         list: [
//           {
//             avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
//             title: '约翰.维尔逊回复了你的邮件约翰.维尔逊回复了你的邮件',
//             subTitle: '2024-12-30 14:33:18',
//             tag: null,
//           },
//         ],
//         delete: '清空通知',
//       },
//       {
//         label: '私信',
//         count: '（2）',
//         name: 'follow',
//         list: [
//           {
//             avatar: Logo,
//             title: '1约翰.维尔逊回复了你的邮件',
//             subTitle: '2024-12-30 14:33:18',
//             tag: null,
//           },
//           {
//             avatar: Logo,
//             title: '2约翰.维尔逊回复了你的邮件约翰.维尔逊回复了你的邮件',
//             subTitle: '2024-12-30 14:33:18',
//             tag: null,
//           },
//         ],
//         delete: '清空私信',
//       },
//       {
//         label: '待办',
//         count: '（3）',
//         name: 'todo',
//         delete: '清空待办',
//         list: [
//           {
//             avatar: '',
//             title: '1约翰.维尔逊回复了你的邮件约翰.维尔逊回复了你的邮件',
//             subTitle: '2024-12-30 14:33:18',
//             tag: {
//               type: 'primary',
//               content: '进行中',
//             },
//           },
//           {
//             avatar: '',
//             title: '2约翰.维尔逊回复了你的邮件约翰.维尔逊回复了你的邮件',
//             subTitle: '2024-12-30 14:33:18',
//             tag: {
//               type: 'info',
//               content: '未开始',
//             },
//           },
//           {
//             avatar: '',
//             title: '3约翰.维尔逊回复了你的邮件',
//             subTitle: '2024-12-30 14:33:18',
//             tag: {
//               type: 'danger',
//               content: '即将到期',
//             },
//           },
//         ],
//       },
//     ],
//   },
//   // messageDropdownList: [
//   //   {
//   //     label: '通知',
//   //     count: '（1）',
//   //     name: 'notification',
//   //     list: [
//   //       {
//   //         avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
//   //         title: '约翰.维尔逊回复了你的邮件约翰.维尔逊回复了你的邮件',
//   //         subTitle: '2024-12-30 14:33:18',
//   //         tag: null,
//   //       },
//   //     ],
//   //     delete: '清空通知',
//   //   },
//   //   {
//   //     label: '私信',
//   //     count: '（2）',
//   //     name: 'follow',
//   //     list: [
//   //       {
//   //         avatar: Logo,
//   //         title: '1约翰.维尔逊回复了你的邮件',
//   //         subTitle: '2024-12-30 14:33:18',
//   //         tag: null,
//   //       },
//   //       {
//   //         avatar: Logo,
//   //         title: '2约翰.维尔逊回复了你的邮件约翰.维尔逊回复了你的邮件',
//   //         subTitle: '2024-12-30 14:33:18',
//   //         tag: null,
//   //       },
//   //     ],
//   //     delete: '清空私信',
//   //   },
//   //   {
//   //     label: '待办',
//   //     count: '（3）',
//   //     name: 'todo',
//   //     delete: '清空待办',
//   //     list: [
//   //       {
//   //         avatar: '',
//   //         title: '1约翰.维尔逊回复了你的邮件约翰.维尔逊回复了你的邮件',
//   //         subTitle: '2024-12-30 14:33:18',
//   //         tag: {
//   //           type: 'primary',
//   //           content: '进行中',
//   //         },
//   //       },
//   //       {
//   //         avatar: '',
//   //         title: '2约翰.维尔逊回复了你的邮件约翰.维尔逊回复了你的邮件',
//   //         subTitle: '2024-12-30 14:33:18',
//   //         tag: {
//   //           type: 'info',
//   //           content: '未开始',
//   //         },
//   //       },
//   //       {
//   //         avatar: '',
//   //         title: '3约翰.维尔逊回复了你的邮件',
//   //         subTitle: '2024-12-30 14:33:18',
//   //         tag: {
//   //           type: 'danger',
//   //           content: '即将到期',
//   //         },
//   //       },
//   //     ],
//   //   },
//   // ],

//   showLanguage: true,
//   languageDropdownProps: {
//     canHiddenXsOnly: true,
//     // list: [],
//     onCommand: (item: IAsideBottom) => {
//       console.log('itemitem', item);
//     }
//   },

//   userDropdownProps: {
//     avatar: avatar,
//     nickName: 'Serati Ma',
//     canTextHiddenXsOnly: true,
//     list: [
//       {
//         index: '/403',
//         title: '个人中心',
//         icon: 'User',
//       },
//       {
//         index: '/404',
//         title: '个人设置',
//         icon: 'Setting',
//       },
//       {
//         index: '/500',
//         title: '修改密码',
//         icon: 'Lock',
//       },
//       {
//         index: '/login',
//         title: '退出登录',
//         divided: true,
//         icon: 'SwitchButton',
//       },
//     ],
//     onCommand: (item: IAsideBottom) => {
//       console.log('itemitem', item);
//       router.push(item.index);
//     }
//   },
// });
// const asideProps = shallowRef<IAsideProps>({
//   menuProps: {
//     menuTree,
//     onMenuItemClick: menuItemClickHandler,
//   },
// });
const breadcrumbProps = reactive<IBreadcrumbProps>({
  showHistory: true,
  historyList: [
    {
      to: '/index',
      title: '首页',
    },
  ],
  menuTree,
  activeRoute: '',
  showBottomBorder: true,
  list: [],
  onCommand: breadcrumbCommandHandler,
});
// const tagsViewProps = reactive<ITagsViewProps>({
//   list: [
//     {
//       id: '8',
//       parentId: null,
//       index: globalSetting.homePath,
//       title: '首页',
//       icon: 'House',
//     },
//   ],
//   showBottomBorder: true,
//   showOperateMenu: true,
//   showMaximize: true,
//   menuTree,
//   activeRoute: '',
//   // onCommand: tagsViewClickHandler,
// });
const mainProps = reactive<IMainProps>({
  breadcrumbProps: {
    showHistory: true,
    historyList: [
      {
        to: '/index',
        title: '首页',
      },
    ],
    menuTree,
    activeRoute: '',
    list: [],
    onCommand: breadcrumbCommandHandler,
  },
});

// 更新 menu 菜单的 default-active
const activeRoute = ref<string>('');
router.beforeEach((to, from, next) => {
  activeRoute.value = to.fullPath;
  next();
});
router.afterEach((to, from, failure) => {
  getBreadcrumbList(to.path);
  getTagsViewList(to.path);
});

function getBreadcrumbList(text: string): void {
  const menuItems: IMenuItem[] = recursionToGetMenuItems(menuTree, text, false, 'index');
  const breadcrumbList: IBreadcrumbItem[] = [];
  if (menuItems.length > 0) {
    const topMenus: IMenuItem[] = recursionToGetTopMenus(menuTree, menuItems);
    const topMenusWithout: IMenuItem[] = recursionToGetTopMenusWithout(menuTree, menuItems);
    if (topMenus.length > 0) {
      let itemJson: IBreadcrumbItem = {
        title: '',
      };
      topMenusWithout.forEach(item => {
        itemJson = {
          title: item.title,
          icon: item.icon,
        };

        if (Array.isArray(topMenus) && topMenus.length) {
          topMenus.forEach(obj => {
            if (obj.id === item.id && Array.isArray(obj.children) && obj.children.length) {
              itemJson.children = [];
              obj.children.forEach(child => {
                itemJson.children?.push({
                  to: child.index,
                  title: child.title,
                  icon: child.icon,
                });
              });
            }
          });
        }

        breadcrumbList.push(itemJson);
      });
    }
  }
  if (headerProps.breadcrumbProps) {
    headerProps.breadcrumbProps.activeRoute = activeRoute.value;
    headerProps.breadcrumbProps.list = [ ...breadcrumbList ];
  }
  if (mainProps.breadcrumbProps) {
    mainProps.breadcrumbProps.activeRoute = activeRoute.value;
    mainProps.breadcrumbProps.list = [ ...breadcrumbList ];
  }
  if (breadcrumbProps) {
    breadcrumbProps.activeRoute = activeRoute.value;
    breadcrumbProps.list = [ ...breadcrumbList ];
  }
}
function getTagsViewList(text: string): void {
  const menuItems: IMenuItem[] = recursionToGetMenuItems(menuTree, text, false, 'index');
  if (menuItems.length && tagsViewProps) {
    tagsViewProps.activeRoute = activeRoute.value;
    tagsViewProps.list = [ ...menuItems ];
  }
}

function switchChangeHandler(item: ISwitchSetting): void {
  console.log('switchChangeHandler', item);
}
</script>