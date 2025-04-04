<template>
  <el-header
    :height="height"
    :class="[
      {
        'sticky': sticky
      },
      'bg-white border-block-end overflow-hidden',
    ]"
    :style="headerStyles"
  >
    <div class="flex-between" style="height: inherit;">
      <ActionMenu
        ref="ActionMenuRef"
        @action-click="actionClickHandler"
      />

      <ProLogo
        v-if="logoProps.logoSrc"
        ref="ProLogoRef"
        class="flex-shrink-0"
        :collapse="collapse"
        v-bind="logoProps"
        @click="toHomeIndexPage"
      />

      <ProBreadcrumb
        v-if="breadcrumbProps.list && breadcrumbProps.list.length"
        ref="ProBreadcrumbRef"
        class="hidden-xs-only flex-1"
        @command="breadcrumbCommand"
        v-bind="breadcrumbProps"
      />

      <div
        v-if="showHeaderMenu"
        class="hidden-sm-and-down flex-1"
        :style="{
          maxWidth: menuMaxWidth,
        }"
      >
        <ProMenu
          :show-search="false"
          :default-active="activeRoute"
          mode="horizontal"
          v-bind="menuProps"
        />
      </div>

      <div
        v-if="
          !logoProps.logoSrc &&
          !(breadcrumbProps.list && breadcrumbProps.list.length) &&
          !showHeaderMenu
        "
      />

      <div ref="OtherRef" class="flex-shrink-0 flex-between">
        <MenuSearch
          v-if="showMenuSearch"
          @item-click="toPageHandler"
          v-bind="menuSearchProps"
        />

        <slot name="header-action">
          <div
            v-for="(item, index) in headerActions"
            :key="index"
            class="cursor-pointer action-item"
            :style="{lineHeight: height}"
          >
            <el-tooltip
              v-if="item.tooltip"
              :content="item.tooltip"
            >
              <div :class="[item.className]">
                <el-icon>
                  <component :is="item.icon" />
                </el-icon>
              </div>
            </el-tooltip>
            <div v-else :class="[item.className]">
              <el-icon>
                <component :is="item.icon" />
              </el-icon>
            </div>
          </div>
        </slot>

        <DarkTheme
          v-if="showDarkTheme"
          :style="{lineHeight: height}"
          v-bind="darkThemeProps"
        />

        <FullScreen
          v-if="showFullScreen"
          :style="{lineHeight: height}"
          v-bind="fullScreenProps"
        />

        <MessageBox
          v-if="showMessage"
          :style="{lineHeight: height}"
          v-bind="messageDropdownProps"
        />

        <LanguageDropdown
          v-if="showLanguage"
          :style="{lineHeight: height}"
          @command="languageCommand"
          v-bind="languageDropdownProps"
        />

        <UserDropdown
          v-if="showUserDropdown"
          :collapse="collapse"
          :style="{height: height}"
          @command="userCommand"
          v-bind="userDropdownProps"
        />
      </div>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { onMounted, ref, type CSSProperties, type PropType } from 'vue';
import type { IAsideBottom } from '../typings/asideBottom';
import type { IMessageDropdownProps } from '../typings/messageDropdown';
import type { IMenuProps } from '../typings/menu';
import type { ILogoProps } from '../typings/logo';
import type { IHeaderAction } from '../typings/headerAction';
import type { IBreadcrumbItem, IBreadcrumbProps } from '../typings/breadcrumb';
import type { IMenuSearchProps, ISuggestionItem } from '../typings/menuSearch';
import type { IUserDropdownProps } from '../typings/userDropdown';
import type { ILanguageDropdownProps} from '../typings/languageDropdown';
import ActionMenu from '../ActionMenu/ActionMenu.vue';
import ProBreadcrumb from '../ProBreadcrumb/index.vue';
import ProLogo from '../ProLogo/index.vue';
import ProMenu from '../ProMenu/index.vue';
import MenuSearch from '../MenuSearch/MenuSearch.vue';
import FullScreen from '../FullScreen/FullScreen.vue';
import MessageBox from '../MessageBox/MessageBox.vue';
import DarkTheme from '../DarkTheme/DarkTheme.vue';
import LanguageDropdown from '../LanguageDropdown/LanguageDropdown.vue';
import UserDropdown from '../UserDropdown/UserDropdown.vue';
import type { IFullScreenProps } from '../typings/fullScreen';
import type { IDarkThemeProps } from '../typings/darkTheme';

// defineProps and defineEmits start
const props = defineProps({
  height: {
    type: String,
    default: '60px',
  },
  headerStyles: {
    type: Object as PropType<CSSProperties>,
    default: () => {
      return {
        backdropFilter: 'blur(8px)',
      }
    }
  },

  sticky: {
    type: Boolean,
  },
  collapse: {
    type: Boolean,
  },

  logoProps: {
    type: Object as PropType<ILogoProps>,
    default: () => ({}),
  },

  breadcrumbProps: {
    type: Object as PropType<IBreadcrumbProps>,
    default: () => ({}),
  },

  activeRoute: {
    type: String,
    default: '',
  },
  showHeaderMenu: {
    type: Boolean,
  },
  menuProps: {
    type: Object as PropType<IMenuProps>,
    default: () => ({}),
  },

  showMenuSearch: {
    type: Boolean,
  },
  menuSearchProps: {
    type: Object as PropType<IMenuSearchProps>,
    default: () => ({}),
  },

  headerActions: {
    type: Array as () => IHeaderAction[],
    default: () => [],
  },

  showDarkTheme: {
    type: Boolean,
    default: true,
  },
  darkThemeProps: {
    type: Object as PropType<IDarkThemeProps>,
    default: () => ({}),
  },

  showFullScreen: {
    type: Boolean,
    default: true,
  },
  fullScreenProps: {
    type: Object as PropType<IFullScreenProps>,
    default: () => ({}),
  },

  showMessage: {
    type: Boolean,
    default: true,
  },
  messageDropdownProps: {
    type: Object as PropType<IMessageDropdownProps>,
    default: () => ({}),
  },
  // messageDropdownList: {
  //   type: Array as () => ITabPanel[],
  //   default: () => [],
  // },

  showLanguage: {
    type: Boolean,
  },
  languageDropdownProps: {
    type: Object as PropType<ILanguageDropdownProps>,
    default: () => ({}),
  },
  // languageDropdownMenu: {
  //   type: Array as () => IAsideBottom[],
  //   default: () => [],
  // },

  showUserDropdown: {
    type: Boolean,
    default: true,
  },
  userDropdownProps: {
    type: Object as PropType<IUserDropdownProps>,
    default: () => ({}),
  },
  // userDropdownMenu: {
  //   type: Array as () => IAsideBottom[],
  //   default: () => [],
  // },
});
const emits = defineEmits([
  'breadcrumb-command',
  'action-click',
  'menu-item-click',
  'logo-click',
  'language-command',
  'user-command',
]);
// defineProps and defineEmits end

function toPageHandler(link: string, obj: ISuggestionItem | null): void {
  emits('menu-item-click', link, obj);
}
function breadcrumbCommand(item: IBreadcrumbItem): void {
  emits('breadcrumb-command', item);
}
function actionClickHandler(): void {
  emits('action-click');
}
function toHomeIndexPage(): void {
  emits('logo-click');
}
function languageCommand(item: IAsideBottom): void {
  emits('language-command', item);
}
function userCommand(item: IAsideBottom): void {
  emits('user-command', item);
}

const ActionMenuRef = ref();
const ProLogoRef = ref();
const ProBreadcrumbRef = ref();
const OtherRef = ref<HTMLElement | null>(null);
const menuMaxWidth = ref<string>('60%');
function getMenuMaxWidth(): void {
  let w: number = 0;
  if(ActionMenuRef.value){
    w += ActionMenuRef.value.$el.offsetWidth;
  }
  if(ProLogoRef.value){
    w += ProLogoRef.value.$el.offsetWidth;
  }
  if(ProBreadcrumbRef.value){
    w += ProBreadcrumbRef.value.$el.offsetWidth;
  }
  if(OtherRef.value){
    w += OtherRef.value.offsetWidth;
  }
  menuMaxWidth.value = `calc(100vw - ${w}px)`;
}
onMounted(() => {
  getMenuMaxWidth();
});
</script>

<style lang="scss" scoped>
.sticky {
  position: sticky;
  top: 0;
  z-index: var(--el-index-top);
  width: 100%;
}

.action-item {
  padding-left: 12px;
  padding-right: 12px;
  &:hover {
    background-color: var(--el-border-color-extra-light);
  }
}
</style>