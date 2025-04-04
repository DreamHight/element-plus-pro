<template>
  <el-main
    id="main"
    :style="{
      maxHeight: maxHeight,
      backgroundColor: 'var(--el-bg-color-page)',
    }"
  >
    <!-- :style="{
      maxHeight: maxHeight,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--el-bg-color-page)',
    }" -->
    <!-- <ProBreadcrumb
      v-if="breadcrumbProps.list && breadcrumbProps.list.length"
      @command="breadcrumbCommand"
      v-bind="breadcrumbProps"
    /> -->

    <!-- <RouterView v-slot="{ Component }" style="flex: 1;min-height: 500px;overflow: auto;"> -->
    <!-- style="min-height: 500px;" -->
    <RouterView v-slot="{ Component }">
      <!-- <div>
        <Transition name="el-fade-in">
          <component :is="Component"></component>
        </Transition>
      </div>
      <div>
        <Transition name="el-fade-in">
          <component :is="Component"></component>
        </Transition>
      </div> -->
      <component :is="Component"></component>
    </RouterView>

    <!-- <Transition name="slide-fade">
      <RouterView style="flex: 1;min-height: 500px;" />
    </Transition> -->
    <!-- <Transition name="bounce">
      <RouterView style="flex: 1;min-height: 500px;"></RouterView>
    </Transition> -->
    <!-- <Transition name="fade" mode="out-in">
      <RouterView style="flex: 1;min-height: 500px;"></RouterView>
    </Transition> -->

    <!-- <div :style="{
      overflow: 'auto',
    }">
      <RouterView v-slot="{ Component }" style="flex: 1;min-height: 500px;">
        <Transition name="el-fade-in">
          <component :is="Component"></component>
        </Transition>
      </RouterView>
    </div> -->
    <!-- <RouterView v-slot="{ Component }" style="flex: 1;min-height: 500px;">
      <component :is="Component"></component>
    </RouterView> -->
    <!-- <RouterView v-slot="{ Component }" style="flex: 1;min-height: 500px;">
      <Transition name="slide-fade">
        <KeepAlive>
          <component :is="Component"></component>
        </KeepAlive>
      </Transition>
    </RouterView> -->
    <!-- <Suspense>
      <component :is="Component"></component>

      <template #fallback>
        正在加载...正在加载...正在加载...正在加载...正在加载...
      </template>
    </Suspense> -->

    <slot name="footer"></slot>
  </el-main>

  <el-backtop target="main" />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import ProBreadcrumb from '../ProBreadcrumb/index.vue';
import type { PropType } from "vue";
import type { IBreadcrumbItem, IBreadcrumbProps } from "../typings/breadcrumb";

// defineProps and defineEmits start
const props = defineProps({
  maxHeight: {
    type: String,
    default: '100vh',
  },
  sticky: {
    type: Boolean,
    default: true,
  },

  breadcrumbProps: {
    type: Object as PropType<IBreadcrumbProps>,
    default: () => ({}),
  },
});
// const emits = defineEmits(['breadcrumb-command']);
// defineProps and defineEmits end

// function breadcrumbCommand(item: IBreadcrumbItem): void {
//   emits('breadcrumb-command', item);
// }
</script>

<style scoped>
.sticky {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}

/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
/* .slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
} */

/* .bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
} */
</style>