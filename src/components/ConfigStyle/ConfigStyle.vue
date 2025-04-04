<template>
  <el-drawer
    v-model="drawerVisible"
    direction="rtl"
    append-to-body
    :overflow="true"
    :with-header="false"
    :size="300"
    style="overflow: visible;"
  >
    <el-text tag="b" size="large" style="color: rgba(0, 0, 0, 0.88);">整体风格设置</el-text>
    <div style="margin: 10px 0 20px;">
      <el-space :size="10">
        <div class="aside-menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="1em"
            height="1em"
            viewBox="0 0 104 104"
          >
            <defs>
              <rect id="path-1" width="90" height="72" x="0" y="0" rx="10"></rect>
              <filter id="filter-2" width="152.2%" height="165.3%" x="-26.1%" y="-27.1%" filterUnits="objectBoundingBox">
                <feMorphology in="SourceAlpha" radius="0.25" result="shadowSpreadOuter1"></feMorphology>
                <feOffset dy="1" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="1"></feGaussianBlur>
                <feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"></feColorMatrix>
                <feMorphology in="SourceAlpha" radius="1" result="shadowSpreadOuter2"></feMorphology>
                <feOffset dy="2" in="shadowSpreadOuter2" result="shadowOffsetOuter2"></feOffset>
                <feGaussianBlur in="shadowOffsetOuter2" result="shadowBlurOuter2" stdDeviation="4"></feGaussianBlur>
                <feColorMatrix in="shadowBlurOuter2" result="shadowMatrixOuter2" values="0 0 0 0 0.098466735 0 0 0 0 0.0599695403 0 0 0 0 0.0599695403 0 0 0 0.07 0"></feColorMatrix>
                <feMorphology in="SourceAlpha" radius="2" result="shadowSpreadOuter3"></feMorphology>
                <feOffset dy="4" in="shadowSpreadOuter3" result="shadowOffsetOuter3"></feOffset>
                <feGaussianBlur in="shadowOffsetOuter3" result="shadowBlurOuter3" stdDeviation="8"></feGaussianBlur>
                <feColorMatrix in="shadowBlurOuter3" result="shadowMatrixOuter3" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"></feColorMatrix>
                <feMerge>
                  <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                  <feMergeNode in="shadowMatrixOuter2"></feMergeNode>
                  <feMergeNode in="shadowMatrixOuter3"></feMergeNode>
                </feMerge>
              </filter>
            </defs>
            <g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
              <g>
                <use fill="#000" filter="url(#filter-2)" xlink:href="#path-1"></use>
                <use fill="#F0F2F5" xlink:href="#path-1"></use>
              </g>
              <path fill="#FFF" d="M26 0h55c5.523 0 10 4.477 10 10v8H26V0z"></path>
              <path fill="#001529" d="M10 0h19v72H10C4.477 72 0 67.523 0 62V10C0 4.477 4.477 0 10 0z"></path>
              <rect width="14" height="3" x="5" y="18" fill="#D7DDE6" opacity="0.2" rx="1.5"></rect>
              <rect width="14" height="3" x="5" y="42" fill="#D7DDE6" opacity="0.2" rx="1.5"></rect>
              <rect width="9" height="3" x="9" y="24" fill="#D7DDE6" opacity="0.2" rx="1.5"></rect>
              <rect width="9" height="3" x="9" y="48" fill="#D7DDE6" opacity="0.2" rx="1.5"></rect>
              <rect width="9" height="3" x="9" y="36" fill="#D7DDE6" opacity="0.2" rx="1.5"></rect>
              <rect width="14" height="3" x="9" y="30" fill="#D7DDE6" opacity="0.2" rx="1.5"></rect>
              <rect width="14" height="3" x="9" y="54" fill="#D7DDE6" opacity="0.2" rx="1.5"></rect>
            </g>
          </svg>
        </div>
        <div class="aside-menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="1em"
            height="1em"
            viewBox="0 0 104 104"
          >
          <defs>
            <rect id="path-1" width="90" height="72" x="0" y="0" rx="10"></rect>
            <filter id="filter-2" width="152.2%" height="165.3%" x="-26.1%" y="-27.1%" filterUnits="objectBoundingBox">
              <feMorphology in="SourceAlpha" radius="0.25" result="shadowSpreadOuter1"></feMorphology>
              <feOffset dy="1" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
              <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="1"></feGaussianBlur>
              <feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"></feColorMatrix>
              <feMorphology in="SourceAlpha" radius="1" result="shadowSpreadOuter2"></feMorphology>
              <feOffset dy="2" in="shadowSpreadOuter2" result="shadowOffsetOuter2"></feOffset>
              <feGaussianBlur in="shadowOffsetOuter2" result="shadowBlurOuter2" stdDeviation="4"></feGaussianBlur>
              <feColorMatrix in="shadowBlurOuter2" result="shadowMatrixOuter2" values="0 0 0 0 0.098466735 0 0 0 0 0.0599695403 0 0 0 0 0.0599695403 0 0 0 0.07 0"></feColorMatrix>
              <feMorphology in="SourceAlpha" radius="2" result="shadowSpreadOuter3"></feMorphology>
              <feOffset dy="4" in="shadowSpreadOuter3" result="shadowOffsetOuter3"></feOffset>
              <feGaussianBlur in="shadowOffsetOuter3" result="shadowBlurOuter3" stdDeviation="8"></feGaussianBlur>
              <feColorMatrix in="shadowBlurOuter3" result="shadowMatrixOuter3" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"></feColorMatrix>
              <feMerge>
                <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                <feMergeNode in="shadowMatrixOuter2"></feMergeNode>
                <feMergeNode in="shadowMatrixOuter3"></feMergeNode>
              </feMerge>
            </filter>
          </defs>
          <g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
            <g>
              <use fill="#000" filter="url(#filter-2)" xlink:href="#path-1"></use>
              <use fill="#F0F2F5" xlink:href="#path-1"></use>
            </g>
            <path fill="#FFF" d="M25 15h65v47c0 5.523-4.477 10-10 10H25V15z"></path>
            <path stroke="#E6EAF0" stroke-linecap="square" d="M0.5 15.5L90.5 15.5"></path>
            <rect width="14" height="3" x="4" y="26" fill="#D7DDE6" rx="1.5"></rect>
            <rect width="9" height="3" x="4" y="32" fill="#D7DDE6" rx="1.5"></rect>
            <rect width="9" height="3" x="4" y="42" fill="#E6EAF0" rx="1.5"></rect>
            <rect width="9" height="3" x="4" y="21" fill="#E6EAF0" rx="1.5"></rect>
            <rect width="9" height="3" x="4" y="53" fill="#D7DDE6" rx="1.5"></rect>
            <rect width="14" height="3" x="4" y="47" fill="#D7DDE6" rx="1.5"></rect>
            <path stroke="#E6EAF0" stroke-linecap="square" d="M25.5 15.5L25.5 72.5"></path>
          </g>
        </svg>
        </div>
      </el-space>
    </div>

    <el-text tag="b" size="large" style="color: rgba(0, 0, 0, 0.88);">主题色</el-text>
    <div style="margin: 10px 0 20px;">
      <el-space>
        <el-tooltip
          v-for="(item, index) in themeColors"
          :key="index"
          placement="top"
          :content="item.alias"
        >
          <el-tag
            class="cursor-pointer"
            style="width: 22px;height: 22px;"
            :color="item.value"
            size="small"
            @click="themeColorSelectHandler(item, index)"
          >
            <el-icon
              v-if="index === currentThemeColorIndex"
              color="#fff"
            >
              <Check />
            </el-icon>
          </el-tag>
        </el-tooltip>
      </el-space>
    </div>

    <el-divider />

    <el-text tag="b" size="large" style="color: rgba(0, 0, 0, 0.88);">导航模式</el-text>
    <div style="margin: 10px 0 20px;">
      <el-space :size="10">
        <el-tooltip
          placement="top"
          content="侧边菜单布局"
        >
          <div class="aside-menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="1em"
              height="1em"
              viewBox="0 0 104 104"
            >
              <defs>
                <rect id="path-1" width="90" height="72" x="0" y="0" rx="10"></rect>
                <filter id="filter-2" width="152.2%" height="165.3%" x="-26.1%" y="-27.1%" filterUnits="objectBoundingBox">
                  <feMorphology in="SourceAlpha" radius="0.25" result="shadowSpreadOuter1"></feMorphology>
                  <feOffset dy="1" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                  <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="1"></feGaussianBlur>
                  <feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"></feColorMatrix>
                  <feMorphology in="SourceAlpha" radius="1" result="shadowSpreadOuter2"></feMorphology>
                  <feOffset dy="2" in="shadowSpreadOuter2" result="shadowOffsetOuter2"></feOffset>
                  <feGaussianBlur in="shadowOffsetOuter2" result="shadowBlurOuter2" stdDeviation="4"></feGaussianBlur>
                  <feColorMatrix in="shadowBlurOuter2" result="shadowMatrixOuter2" values="0 0 0 0 0.098466735 0 0 0 0 0.0599695403 0 0 0 0 0.0599695403 0 0 0 0.07 0"></feColorMatrix>
                  <feMorphology in="SourceAlpha" radius="2" result="shadowSpreadOuter3"></feMorphology>
                  <feOffset dy="4" in="shadowSpreadOuter3" result="shadowOffsetOuter3"></feOffset>
                  <feGaussianBlur in="shadowOffsetOuter3" result="shadowBlurOuter3" stdDeviation="8"></feGaussianBlur>
                  <feColorMatrix in="shadowBlurOuter3" result="shadowMatrixOuter3" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"></feColorMatrix>
                  <feMerge>
                    <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                    <feMergeNode in="shadowMatrixOuter2"></feMergeNode>
                    <feMergeNode in="shadowMatrixOuter3"></feMergeNode>
                  </feMerge>
                </filter>
              </defs>
              <g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
                <g>
                  <use fill="#000" filter="url(#filter-2)" xlink:href="#path-1"></use>
                  <use fill="#F0F2F5" xlink:href="#path-1"></use>
                </g>
                <path fill="#FFF" d="M26 0h55c5.523 0 10 4.477 10 10v8H26V0z"></path>
                <path fill="#001529" d="M10 0h19v72H10C4.477 72 0 67.523 0 62V10C0 4.477 4.477 0 10 0z"></path>
                <rect width="14" height="3" x="5" y="18" fill="#D7DDE6" opacity="0.2" rx="1.5"></rect>
                <rect width="14" height="3" x="5" y="42" fill="#D7DDE6" opacity="0.2" rx="1.5"></rect>
                <rect width="9" height="3" x="9" y="24" fill="#D7DDE6" opacity="0.2" rx="1.5"></rect>
                <rect width="9" height="3" x="9" y="48" fill="#D7DDE6" opacity="0.2" rx="1.5"></rect>
                <rect width="9" height="3" x="9" y="36" fill="#D7DDE6" opacity="0.2" rx="1.5"></rect>
                <rect width="14" height="3" x="9" y="30" fill="#D7DDE6" opacity="0.2" rx="1.5"></rect>
                <rect width="14" height="3" x="9" y="54" fill="#D7DDE6" opacity="0.2" rx="1.5"></rect>
              </g>
            </svg>
          </div>

          <el-icon>
            <Check />
          </el-icon>
        </el-tooltip>
        <el-tooltip
          placement="top"
          content="顶部菜单布局"
        >
          <div class="aside-menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="1em"
              height="1em"
              viewBox="0 0 104 104"
            >
            <defs>
              <rect id="path-1" width="90" height="72" x="0" y="0" rx="10"></rect>
              <filter id="filter-2" width="152.2%" height="165.3%" x="-26.1%" y="-27.1%" filterUnits="objectBoundingBox">
                <feMorphology in="SourceAlpha" radius="0.25" result="shadowSpreadOuter1"></feMorphology>
                <feOffset dy="1" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="1"></feGaussianBlur>
                <feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"></feColorMatrix>
                <feMorphology in="SourceAlpha" radius="1" result="shadowSpreadOuter2"></feMorphology>
                <feOffset dy="2" in="shadowSpreadOuter2" result="shadowOffsetOuter2"></feOffset>
                <feGaussianBlur in="shadowOffsetOuter2" result="shadowBlurOuter2" stdDeviation="4"></feGaussianBlur>
                <feColorMatrix in="shadowBlurOuter2" result="shadowMatrixOuter2" values="0 0 0 0 0.098466735 0 0 0 0 0.0599695403 0 0 0 0 0.0599695403 0 0 0 0.07 0"></feColorMatrix>
                <feMorphology in="SourceAlpha" radius="2" result="shadowSpreadOuter3"></feMorphology>
                <feOffset dy="4" in="shadowSpreadOuter3" result="shadowOffsetOuter3"></feOffset>
                <feGaussianBlur in="shadowOffsetOuter3" result="shadowBlurOuter3" stdDeviation="8"></feGaussianBlur>
                <feColorMatrix in="shadowBlurOuter3" result="shadowMatrixOuter3" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"></feColorMatrix>
                <feMerge>
                  <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                  <feMergeNode in="shadowMatrixOuter2"></feMergeNode>
                  <feMergeNode in="shadowMatrixOuter3"></feMergeNode>
                </feMerge>
              </filter>
            </defs>
            <g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
              <g>
                <use fill="#000" filter="url(#filter-2)" xlink:href="#path-1"></use>
                <use fill="#F0F2F5" xlink:href="#path-1"></use>
              </g>
              <path fill="#FFF" d="M25 15h65v47c0 5.523-4.477 10-10 10H25V15z"></path>
              <path stroke="#E6EAF0" stroke-linecap="square" d="M0.5 15.5L90.5 15.5"></path>
              <rect width="14" height="3" x="4" y="26" fill="#D7DDE6" rx="1.5"></rect>
              <rect width="9" height="3" x="4" y="32" fill="#D7DDE6" rx="1.5"></rect>
              <rect width="9" height="3" x="4" y="42" fill="#E6EAF0" rx="1.5"></rect>
              <rect width="9" height="3" x="4" y="21" fill="#E6EAF0" rx="1.5"></rect>
              <rect width="9" height="3" x="4" y="53" fill="#D7DDE6" rx="1.5"></rect>
              <rect width="14" height="3" x="4" y="47" fill="#D7DDE6" rx="1.5"></rect>
              <path stroke="#E6EAF0" stroke-linecap="square" d="M25.5 15.5L25.5 72.5"></path>
            </g>
          </svg>
          </div>
        </el-tooltip>
        <el-tooltip
          placement="top"
          content="混合菜单布局"
        >
          <div class="aside-menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="1em"
              height="1em"
              viewBox="0 0 104 104"
            >
            <defs>
              <rect id="path-1" width="90" height="72" x="0" y="0" rx="10"></rect>
              <filter id="filter-2" width="152.2%" height="165.3%" x="-26.1%" y="-27.1%" filterUnits="objectBoundingBox">
                <feMorphology in="SourceAlpha" radius="0.25" result="shadowSpreadOuter1"></feMorphology>
                <feOffset dy="1" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="1"></feGaussianBlur>
                <feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"></feColorMatrix>
                <feMorphology in="SourceAlpha" radius="1" result="shadowSpreadOuter2"></feMorphology>
                <feOffset dy="2" in="shadowSpreadOuter2" result="shadowOffsetOuter2"></feOffset>
                <feGaussianBlur in="shadowOffsetOuter2" result="shadowBlurOuter2" stdDeviation="4"></feGaussianBlur>
                <feColorMatrix in="shadowBlurOuter2" result="shadowMatrixOuter2" values="0 0 0 0 0.098466735 0 0 0 0 0.0599695403 0 0 0 0 0.0599695403 0 0 0 0.07 0"></feColorMatrix>
                <feMorphology in="SourceAlpha" radius="2" result="shadowSpreadOuter3"></feMorphology>
                <feOffset dy="4" in="shadowSpreadOuter3" result="shadowOffsetOuter3"></feOffset>
                <feGaussianBlur in="shadowOffsetOuter3" result="shadowBlurOuter3" stdDeviation="8"></feGaussianBlur>
                <feColorMatrix in="shadowBlurOuter3" result="shadowMatrixOuter3" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"></feColorMatrix>
                <feMerge>
                  <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                  <feMergeNode in="shadowMatrixOuter2"></feMergeNode>
                  <feMergeNode in="shadowMatrixOuter3"></feMergeNode>
                </feMerge>
              </filter>
            </defs>
            <g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
              <g>
                <use fill="#000" filter="url(#filter-2)" xlink:href="#path-1"></use>
                <use fill="#F0F2F5" xlink:href="#path-1"></use>
              </g>
              <path fill="#FFF" d="M25 15h65v47c0 5.523-4.477 10-10 10H25V15z"></path>
              <path stroke="#E6EAF0" stroke-linecap="square" d="M0.5 15.5L90.5 15.5"></path>
              <rect width="14" height="3" x="4" y="26" fill="#D7DDE6" rx="1.5"></rect>
              <rect width="9" height="3" x="4" y="32" fill="#D7DDE6" rx="1.5"></rect>
              <rect width="9" height="3" x="4" y="42" fill="#E6EAF0" rx="1.5"></rect>
              <rect width="9" height="3" x="4" y="21" fill="#E6EAF0" rx="1.5"></rect>
              <rect width="9" height="3" x="4" y="53" fill="#D7DDE6" rx="1.5"></rect>
              <rect width="14" height="3" x="4" y="47" fill="#D7DDE6" rx="1.5"></rect>
              <path stroke="#E6EAF0" stroke-linecap="square" d="M25.5 15.5L25.5 72.5"></path>
            </g>
          </svg>
          </div>
        </el-tooltip>
      </el-space>
    </div>

    <el-text tag="b" size="large" style="color: rgba(0, 0, 0, 0.88);">侧边菜单类型</el-text>
    <div style="margin: 10px 0 20px;">
      <el-space :size="10">
        <div class="aside-menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="1em"
            height="1em"
            viewBox="0 0 104 104"
          >
            <defs>
              <rect id="path-1" width="90" height="72" x="0" y="0" rx="10"></rect>
              <filter id="filter-2" width="152.2%" height="165.3%" x="-26.1%" y="-27.1%" filterUnits="objectBoundingBox">
                <feMorphology in="SourceAlpha" radius="0.25" result="shadowSpreadOuter1"></feMorphology>
                <feOffset dy="1" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="1"></feGaussianBlur>
                <feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"></feColorMatrix>
                <feMorphology in="SourceAlpha" radius="1" result="shadowSpreadOuter2"></feMorphology>
                <feOffset dy="2" in="shadowSpreadOuter2" result="shadowOffsetOuter2"></feOffset>
                <feGaussianBlur in="shadowOffsetOuter2" result="shadowBlurOuter2" stdDeviation="4"></feGaussianBlur>
                <feColorMatrix in="shadowBlurOuter2" result="shadowMatrixOuter2" values="0 0 0 0 0.098466735 0 0 0 0 0.0599695403 0 0 0 0 0.0599695403 0 0 0 0.07 0"></feColorMatrix>
                <feMorphology in="SourceAlpha" radius="2" result="shadowSpreadOuter3"></feMorphology>
                <feOffset dy="4" in="shadowSpreadOuter3" result="shadowOffsetOuter3"></feOffset>
                <feGaussianBlur in="shadowOffsetOuter3" result="shadowBlurOuter3" stdDeviation="8"></feGaussianBlur>
                <feColorMatrix in="shadowBlurOuter3" result="shadowMatrixOuter3" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"></feColorMatrix>
                <feMerge>
                  <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                  <feMergeNode in="shadowMatrixOuter2"></feMergeNode>
                  <feMergeNode in="shadowMatrixOuter3"></feMergeNode>
                </feMerge>
              </filter>
            </defs>
            <g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
              <g>
                <use fill="#000" filter="url(#filter-2)" xlink:href="#path-1"></use>
                <use fill="#F0F2F5" xlink:href="#path-1"></use>
              </g>
              <path fill="#FFF" d="M26 0h55c5.523 0 10 4.477 10 10v8H26V0z"></path>
              <path fill="#001529" d="M10 0h19v72H10C4.477 72 0 67.523 0 62V10C0 4.477 4.477 0 10 0z"></path>
              <rect width="14" height="3" x="5" y="18" fill="#D7DDE6" opacity="0.2" rx="1.5"></rect>
              <rect width="14" height="3" x="5" y="42" fill="#D7DDE6" opacity="0.2" rx="1.5"></rect>
              <rect width="9" height="3" x="9" y="24" fill="#D7DDE6" opacity="0.2" rx="1.5"></rect>
              <rect width="9" height="3" x="9" y="48" fill="#D7DDE6" opacity="0.2" rx="1.5"></rect>
              <rect width="9" height="3" x="9" y="36" fill="#D7DDE6" opacity="0.2" rx="1.5"></rect>
              <rect width="14" height="3" x="9" y="30" fill="#D7DDE6" opacity="0.2" rx="1.5"></rect>
              <rect width="14" height="3" x="9" y="54" fill="#D7DDE6" opacity="0.2" rx="1.5"></rect>
            </g>
          </svg>
        </div>
        <div class="aside-menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="1em"
            height="1em"
            viewBox="0 0 104 104"
          >
          <defs>
            <rect id="path-1" width="90" height="72" x="0" y="0" rx="10"></rect>
            <filter id="filter-2" width="152.2%" height="165.3%" x="-26.1%" y="-27.1%" filterUnits="objectBoundingBox">
              <feMorphology in="SourceAlpha" radius="0.25" result="shadowSpreadOuter1"></feMorphology>
              <feOffset dy="1" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
              <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="1"></feGaussianBlur>
              <feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"></feColorMatrix>
              <feMorphology in="SourceAlpha" radius="1" result="shadowSpreadOuter2"></feMorphology>
              <feOffset dy="2" in="shadowSpreadOuter2" result="shadowOffsetOuter2"></feOffset>
              <feGaussianBlur in="shadowOffsetOuter2" result="shadowBlurOuter2" stdDeviation="4"></feGaussianBlur>
              <feColorMatrix in="shadowBlurOuter2" result="shadowMatrixOuter2" values="0 0 0 0 0.098466735 0 0 0 0 0.0599695403 0 0 0 0 0.0599695403 0 0 0 0.07 0"></feColorMatrix>
              <feMorphology in="SourceAlpha" radius="2" result="shadowSpreadOuter3"></feMorphology>
              <feOffset dy="4" in="shadowSpreadOuter3" result="shadowOffsetOuter3"></feOffset>
              <feGaussianBlur in="shadowOffsetOuter3" result="shadowBlurOuter3" stdDeviation="8"></feGaussianBlur>
              <feColorMatrix in="shadowBlurOuter3" result="shadowMatrixOuter3" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"></feColorMatrix>
              <feMerge>
                <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                <feMergeNode in="shadowMatrixOuter2"></feMergeNode>
                <feMergeNode in="shadowMatrixOuter3"></feMergeNode>
              </feMerge>
            </filter>
          </defs>
          <g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
            <g>
              <use fill="#000" filter="url(#filter-2)" xlink:href="#path-1"></use>
              <use fill="#F0F2F5" xlink:href="#path-1"></use>
            </g>
            <path fill="#FFF" d="M25 15h65v47c0 5.523-4.477 10-10 10H25V15z"></path>
            <path stroke="#E6EAF0" stroke-linecap="square" d="M0.5 15.5L90.5 15.5"></path>
            <rect width="14" height="3" x="4" y="26" fill="#D7DDE6" rx="1.5"></rect>
            <rect width="9" height="3" x="4" y="32" fill="#D7DDE6" rx="1.5"></rect>
            <rect width="9" height="3" x="4" y="42" fill="#E6EAF0" rx="1.5"></rect>
            <rect width="9" height="3" x="4" y="21" fill="#E6EAF0" rx="1.5"></rect>
            <rect width="9" height="3" x="4" y="53" fill="#D7DDE6" rx="1.5"></rect>
            <rect width="14" height="3" x="4" y="47" fill="#D7DDE6" rx="1.5"></rect>
            <path stroke="#E6EAF0" stroke-linecap="square" d="M25.5 15.5L25.5 72.5"></path>
          </g>
        </svg>
        </div>
      </el-space>
    </div>

    <div class="flex-between" style="margin-bottom: 6px;">
      <span>内容区域宽度</span>
      <el-select
        v-model="contentWidth"
        size="small"
        style="width: 60px"
        @change="contentWidthSelectHandler"
      >
        <el-option
          v-for="item in contentWidthOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>

    <div
      v-for="item in navigationMode"
      :key="item.label"
      class="flex-between"
    >
      <span>{{ item.label }}</span>
      <el-switch v-model="item.value" />
    </div>

    <el-divider />

    <el-text tag="b" size="large" style="color: rgba(0, 0, 0, 0.88);">内容区域</el-text>
    <div
      v-for="item in contentArea"
      :key="item.label"
      class="flex-between"
    >
      <span>{{ item.label }}</span>
      <el-switch v-model="item.value" />
    </div>

    <el-divider />

    <el-text tag="b" size="large" style="color: rgba(0, 0, 0, 0.88);">其他设置</el-text>
    <div
      v-for="item in otherSetting"
      :key="item.label"
      class="flex-between"
    >
      <span>{{ item.label }}</span>
      <el-switch v-model="item.value" @change="switchChangeHandler(item)" />
    </div>

    <el-divider />

    <el-alert
      title="配置栏只在开发环境用于预览，生产环境不会展现，请拷贝后手动修改配置文件"
      type="warning"
      show-icon
      :closable="false"
    />

    <el-button icon="CopyDocument" style="width: 100%;margin-top: 15px;">拷贝设置</el-button>

    <div
      class="config-style right-300px"
      @click="toggleDrawerHandler"
    >
      <el-icon size="24" color="white">
        <el-icon><Close /></el-icon>
      </el-icon>
    </div>
  </el-drawer>

  <div
    class="config-style right-0"
    :class="[
      drawerVisible ? 'opacity-0' : 'opacity-100 z-index-top'
    ]"
    @click="toggleDrawerHandler"
  >
    <el-icon size="24" color="white">
      <el-icon><Setting /></el-icon>
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import {
  Check,
  Close,
  Setting,
} from '@element-plus/icons-vue';
import { useTheme } from '../hooks/use-theme';
import { useGrayMode } from '../hooks/use-gray-mode';
import type { ISwitchSetting, IThemeColor } from '../typings/configStyle';

// defineProps and defineEmits start
const emits = defineEmits([
  'content-width',
  'switch-change',
]);
// defineProps and defineEmits end

const drawerVisible = ref<boolean>(false);
function toggleDrawerHandler() {
  drawerVisible.value = !drawerVisible.value;
}

const currentThemeColorIndex = ref<number>(0);
const themeColors: IThemeColor[] = [
  {
    alias: 'Priamry（默认）',
    value: '#409EFF',
  },
  {
    alias: 'Danger',
    value: '#F56C6C',
  },
  {
    alias: 'Success',
    value: '#67C23A',
  },
  {
    alias: 'Warning',
    value: '#E6A23C',
  },
  {
    alias: '极客蓝',
    value: '#2f54eb',
  },
  {
    alias: '酱紫',
    value: '#722ed1',
  },
];
function themeColorSelectHandler(item: IThemeColor, index: number): void {
  currentThemeColorIndex.value = index;

  const { setThemeColor } = useTheme();
  setThemeColor(item.value);
}

const contentWidth = ref('Fluid'); // 定宽 流式
const contentWidthOptions = reactive<ISwitchSetting[]>([
  {
    key: 'Fixed',
    label: '定宽',
    value: 'Fixed',
  },
  {
    key: 'Fluid',
    label: '流式',
    value: 'Fluid',
  },
]);
function contentWidthSelectHandler(value: string): void {
  emits('content-width', value);
}

const navigationMode = reactive<ISwitchSetting[]>([
  {
    key: 'FixedHeader',
    label: '固定 Header',
    value: true,
  },
  {
    key: 'FixedSideHeader',
    label: '固定侧边菜单',
    value: true,
  },
  {
    key: 'AutoSplitMenu',
    label: '自动分割菜单',
    value: true,
  },
]);

const contentArea = reactive<ISwitchSetting[]>([
  {
    key: 'TopBar',
    label: '顶栏',
    value: true,
  },
  {
    key: 'Footer',
    label: '页脚',
    value: true,
  },
  {
    key: 'Menu',
    label: '菜单',
    value: true,
  },
  {
    key: 'MenuHeader',
    label: '菜单头',
    value: true,
  },
]);

const otherSetting = reactive<ISwitchSetting[]>([
  // {
  //   key: 'WeaknessMode',
  //   label: '色弱模式',
  //   value: false,
  // },
  {
    key: 'GrayScaleMode',
    label: '灰色模式',
    value: false,
  },
]);
function setGrayMode(): void {
  const { toggleGrayMode } = useGrayMode();
  toggleGrayMode();
}

function switchChangeHandler(item: ISwitchSetting): void {
  console.log('valval111', item);
  if (item.key === 'GrayScaleMode') {
    setGrayMode();
  }
  emits('switch-change', item);
}
</script>

<style lang="scss" scoped>
.aside-menu {
  position: relative;
  width: 44px;
  height: 36px;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  font-size: 56px;
  line-height: 56px;
}

.config-style {
  position: absolute;
  top: 200px;
  bottom: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: var(--el-color-primary);
  border-radius: 10px 0 0 10px;
  cursor: pointer;
}

.z-index-top {
  z-index: var(--el-index-top);
}

.right-300px {
  right: 300px;
}

.opacity-100 {
  opacity: 1;
  transition: opacity 0.5s linear;
}
</style>