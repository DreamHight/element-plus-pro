<template>
  <div>
    <h2 style="font-weight: bold;">{{ title[activeName] }}</h2>

    <div style="margin: 10px auto; width: 400px;">
      <el-input
        v-model="searchValue"
        placeholder="请输入"
        size="large"
        :prefix-icon="Search"
      >
        <template #append>
          <el-button
            type="primary"
            auto-insert-space
            @click="searchHandler"
          >搜索</el-button>
        </template>
      </el-input>
    </div>

    <el-tabs v-model="activeName" @tab-click="tabClickHandler">
      <el-tab-pane label="文章" name="articles">
        <el-card shadow="never" class="search-box">
          <div style="display: flex; justify-content: space-between; align-items: start; gap: 0px 8px;">
            <div style="min-width: 75px;">所属类目：</div>
            <el-space
              wrap
              :style="{
                flex: 1,
                height: toggleValue ? 'auto' : '24px',
                overflow: 'hidden',
              }"
            >
              <!-- <el-tag
                v-for="item in categoryList"
                :key="item.label"
                :effect="currentCategoryValue === item.value ? 'dark' : 'plain'"
                :type="currentCategoryValue === item.value ? 'primary' : 'info'"
                style="cursor: pointer;"
                @click="categoryClickHandler(item)"
              >{{ item.label }}</el-tag> -->
              <el-tag
                v-for="item in categoryList"
                :key="item.label"
                :effect="currentCategoryValue.includes(item.value) ? 'dark' : 'plain'"
                :type="currentCategoryValue.includes(item.value) ? 'primary' : 'info'"
                style="cursor: pointer;"
                @click="categoryClickHandler(item)"
              >{{ item.label }}</el-tag>
            </el-space>
            <el-text
              type="primary"
              style="align-self: start; min-width: 45px; cursor: pointer;"
              @click="toggleHandler"
            >
              <span>{{ toggleValue ? '收起' : '展开' }}</span>
              <el-icon>
                <component :is="toggleValue ? IconArrowUp : IconArrowDown" />
              </el-icon>
            </el-text>
          </div>

          <el-divider border-style="dotted" />

          <el-space>
            <div style="min-width: 75px;">owner：</div>
            <el-space>
              <el-select
                v-model="selectOwner"
                multiple
                filterable
                placeholder="选择owner"
                style="min-width: 200px"
              >
                <el-option label="我自己" value="1" />
                <el-option label="周星星" value="2" />
                <el-option label="李三" value="3" />
              </el-select>
              <el-button link type="primary" @click="selectOwnerHandler('1')">只看自己的</el-button>
            </el-space>
          </el-space>

          <el-divider border-style="dotted" />

          <el-space>
            <div style="min-width: 75px;">其它选项：</div>
            <el-space :size="50">
              <el-space>
                <span>活跃用户：</span>
                <el-select
                  v-model="activeUser"
                  placeholder="不限"
                  style="width: 120px;"
                >
                  <el-option label="李三" value="lisan" />
                </el-select>
              </el-space>
              <el-space>
                <span>好评度：</span>
                <el-select
                  v-model="positiveRating"
                  placeholder="不限"
                  style="width: 120px;"
                >
                  <el-option label="优秀" value="youxiu" />
                </el-select>
              </el-space>
            </el-space>
          </el-space>
        </el-card>

        <el-card shadow="never" style="margin-top: 20px;">
          <template
            v-for="(item, index) in articleList"
            :key="index"
          >
            <el-space direction="vertical" alignment="start"style="padding-inline: 30px;">
              <h3 class="content-title">{{ item.title }}</h3>
              <el-space>
                <el-tag
                  v-for="tag in item.tags"
                  :key="tag"
                  type="info"
                >{{ tag }}</el-tag>
              </el-space>
              <div style="min-width: 400px; max-width: 500px;">
                <el-text>{{ item.paragraph }}</el-text>
              </div>
              <el-space>
                <el-avatar size="small" :src="item.origin.avatar" />
                <el-button link type="primary">{{ item.origin.name }}</el-button>
                <span>{{ item.origin.publish }}</span>
                <el-button link type="primary">{{ item.origin.link }}</el-button>
              </el-space>
              <el-space :spacer="spacer">
                <el-space
                  v-for="(o, i) in item.interactive"
                  :key="i"
                  :size="5"
                >
                  <el-icon>
                    <component :is="o.icon" />
                  </el-icon>
                  <el-text>{{ o.text }}</el-text>
                </el-space>
              </el-space>
            </el-space>

            <el-divider v-if="index < articleList.length - 1" />
          </template>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="项目" name="projects" class="project-pane">
        <el-card shadow="never" class="search-box">
          <div style="display: flex; justify-content: space-between; align-items: start; gap: 0px 8px;">
            <div style="min-width: 75px;">所属类目：</div>
            <el-space
              wrap
              :style="{
                flex: 1,
                height: toggleValue ? 'auto' : '24px',
                overflow: 'hidden',
              }"
            >
              <!-- <el-tag
                v-for="item in categoryList"
                :key="item.label"
                :effect="currentCategoryValue === item.value ? 'dark' : 'plain'"
                :type="currentCategoryValue === item.value ? 'primary' : 'info'"
                style="cursor: pointer;"
                @click="categoryClickHandler(item)"
              >{{ item.label }}</el-tag> -->
              <el-tag
                v-for="item in categoryList"
                :key="item.label"
                :effect="currentCategoryValue.includes(item.value) ? 'dark' : 'plain'"
                :type="currentCategoryValue.includes(item.value) ? 'primary' : 'info'"
                style="cursor: pointer;"
                @click="categoryClickHandler(item)"
              >{{ item.label }}</el-tag>
            </el-space>
            <el-text
              type="primary"
              style="align-self: start; min-width: 45px; cursor: pointer;"
              @click="toggleHandler"
            >
              <span>{{ toggleValue ? '收起' : '展开' }}</span>
              <el-icon>
                <component :is="toggleValue ? IconArrowUp : IconArrowDown" />
              </el-icon>
            </el-text>
          </div>

          <el-divider border-style="dotted" />

          <el-space>
            <div style="min-width: 75px;">其它选项：</div>
            <el-space :size="50">
              <el-space>
                <span>作者：</span>
                <el-select
                  v-model="activeUser"
                  placeholder="不限"
                  style="width: 120px;"
                >
                  <el-option label="李三" value="lisan" />
                </el-select>
              </el-space>
              <el-space>
                <span>好评度：</span>
                <el-select
                  v-model="positiveRating"
                  placeholder="不限"
                  style="width: 120px;"
                >
                  <el-option label="优秀" value="youxiu" />
                </el-select>
              </el-space>
            </el-space>
          </el-space>
        </el-card>

        <el-row :gutter="20">
          <el-col
            v-for="(item, index) in projectList"
            :key="index"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="6"
          >
            <el-card shadow="hover" body-style="padding: 0;" class="card-box">
              <el-image :src="item.image" style="width: 100%;" />
              <el-space direction="vertical" alignment="start" style="padding: 20px;">
                <h3 class="content-title">{{ item.title }}</h3>
                <el-text :line-clamp="2">{{ item.description }}</el-text>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <el-text type="info">{{ item.time }}</el-text>
                  <avatar-group size="small" :max="3" :avatarGroup="item.avatarGroup" />
                </div>
              </el-space>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="应用" name="applications" class="application-pane">
        <el-card shadow="never" class="search-box">
          <div style="display: flex; justify-content: space-between; align-items: start; gap: 0px 8px;">
            <div style="min-width: 75px;">所属类目：</div>
            <el-space
              wrap
              :style="{
                flex: 1,
                height: toggleValue ? 'auto' : '24px',
                overflow: 'hidden',
              }"
            >
              <!-- <el-tag
                v-for="item in categoryList"
                :key="item.label"
                :effect="currentCategoryValue === item.value ? 'dark' : 'plain'"
                :type="currentCategoryValue === item.value ? 'primary' : 'info'"
                style="cursor: pointer;"
                @click="categoryClickHandler(item)"
              >{{ item.label }}</el-tag> -->
              <el-tag
                v-for="item in categoryList"
                :key="item.label"
                :effect="currentCategoryValue.includes(item.value) ? 'dark' : 'plain'"
                :type="currentCategoryValue.includes(item.value) ? 'primary' : 'info'"
                style="cursor: pointer;"
                @click="categoryClickHandler(item)"
              >{{ item.label }}</el-tag>
            </el-space>
            <el-text
              type="primary"
              style="align-self: start; min-width: 45px; cursor: pointer;"
              @click="toggleHandler"
            >
              <span>{{ toggleValue ? '收起' : '展开' }}</span>
              <el-icon>
                <component :is="toggleValue ? IconArrowUp : IconArrowDown" />
              </el-icon>
            </el-text>
          </div>

          <el-divider border-style="dotted" />

          <el-space>
            <div style="min-width: 75px;">其它选项：</div>
            <el-space :size="50">
              <el-space>
                <span>作者：</span>
                <el-select
                  v-model="activeUser"
                  placeholder="不限"
                  style="width: 120px;"
                >
                  <el-option label="李三" value="lisan" />
                </el-select>
              </el-space>
              <el-space>
                <span>好评度：</span>
                <el-select
                  v-model="positiveRating"
                  placeholder="不限"
                  style="width: 120px;"
                >
                  <el-option label="优秀" value="youxiu" />
                </el-select>
              </el-space>
            </el-space>
          </el-space>
        </el-card>

        <el-row :gutter="20">
          <el-col
            v-for="(item, index) in applicationList"
            :key="index"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="6"
          >
            <el-card shadow="hover" class="card-box">
              <el-space alignment="start" :size="20">
                <el-avatar size="small" :src="item.avatar" />
                <div>
                  <h3 class="content-title">{{ item.title }}</h3>
                  <el-space style="margin-block: 10px;">
                    <div>
                      <el-text>{{ item.users[0].desc }}</el-text>
                      <div>
                        <span style="font-size: 24px;">{{ item.users[0].count }}</span>
                        <span>万</span>
                      </div>
                    </div>
                    <div>
                      <el-text>{{ item.users[1].desc }}</el-text>
                      <div>
                        <span style="font-size: 24px;">{{ item.users[1].count }}</span>
                      </div>
                    </div>
                  </el-space>
                </div>
              </el-space>
              <template #footer>
                <el-space :spacer="spacer">
                  <el-tooltip placement="top" content="下载">
                    <el-icon><Download /></el-icon>
                  </el-tooltip>
                  <el-tooltip placement="top" content="编辑">
                    <el-icon><EditPen /></el-icon>
                  </el-tooltip>
                  <el-tooltip placement="top" content="分享">
                    <el-icon><Share /></el-icon>
                  </el-tooltip>
                  <el-dropdown style="justify-content: center;">
                    <el-icon><MoreFilled /></el-icon>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item>Action 1</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                        <el-dropdown-item disabled>Action 4</el-dropdown-item>
                        <el-dropdown-item divided>Action 5</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </el-space>
              </template>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { h, ref, watch } from 'vue';
import { useRouter, type Router } from 'vue-router';
import { ElDivider, type TabsPaneContext } from 'element-plus';
import IconArrowDown from '../icons/IconArrowDown.vue';
import IconArrowUp from '../icons/IconArrowDown.vue';
import { ChatLineRound, Download, EditPen, MoreFilled, Position, Share, Search, Star } from '@element-plus/icons-vue';

const router: Router = useRouter();

// defineProps and defineEmits start
const props = defineProps({
  activePane: {
    type: String,
    default: 'articles',
    validator: (val: string) => {
      return ['articles', 'projects', 'applications'].includes(val);
    }
  },
});
const emits = defineEmits(['search']);
// defineProps and defineEmits end

const title: Record<string, string> = {
  'articles': '搜索列表（文章）',
  'projects': '搜索列表（项目）',
  'applications': '搜索列表（应用）',
};

const articleList = [
  {
    title: 'Alipay',
    tags: ['设计语言', 'Element', 'Element Plus'],
    paragraph: '段落示意：基于Element Plus 设计的后台管理平台，用最小的工作量，无缝接入 Element 生态，提供跨越设计与开发的体验解决方案。基于Element Plus 设计的后台管理平台，用最小的工作量，无缝接入 Element 生态，提供跨越设计与开发的体验解决方案。',
    origin: {
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
      name: '曲丽丽',
      publish: '发布在',
      link: 'https://element.plus.admin.com',
    },
    interactive: [
      {
        icon: Star,
        text: 132,
      },
      {
        icon: Position,
        text: 102,
      },
      {
        icon: ChatLineRound,
        text: 19,
      },
    ],
  },
  {
    title: 'Angular',
    tags: ['设计语言', 'Element', 'Element Plus'],
    paragraph: '段落示意：基于Element Plus 设计的后台管理平台，用最小的工作量，无缝接入 Element 生态，提供跨越设计与开发的体验解决方案。基于Element Plus 设计的后台管理平台，用最小的工作量，无缝接入 Element 生态，提供跨越设计与开发的体验解决方案。',
    origin: {
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
      name: '曲丽丽',
      publish: '发布在',
      link: 'https://element.plus.admin.com',
    },
    interactive: [
      {
        icon: Star,
        text: 149,
      },
      {
        icon: Position,
        text: 184,
      },
      {
        icon: ChatLineRound,
        text: 18,
      },
    ],
  },
  {
    title: 'Bootstrap',
    tags: ['设计语言', 'Element', 'Element Plus'],
    paragraph: '段落示意：基于Element Plus 设计的后台管理平台，用最小的工作量，无缝接入 Element 生态，提供跨越设计与开发的体验解决方案。基于Element Plus 设计的后台管理平台，用最小的工作量，无缝接入 Element 生态，提供跨越设计与开发的体验解决方案。',
    origin: {
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
      name: '曲丽丽',
      publish: '发布在',
      link: 'https://element.plus.admin.com',
    },
    interactive: [
      {
        icon: Star,
        text: 190,
      },
      {
        icon: Position,
        text: 168,
      },
      {
        icon: ChatLineRound,
        text: 18,
      },
    ],
  },
];

const projectList = [
  {
    image: 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
    title: 'Alipay',
    description: '那是一种内在的东西， 他们到达不了，也无法触及的',
    time: '几秒前',
    avatarGroup: [
      {
        tooltip: '貂蝉',
        src: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png'
      },
      {
        tooltip: '王昭君',
        src: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
      },
      {
        tooltip: '杨玉环',
        src: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
      },
    ],
  },
  {
    image: 'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
    title: 'Angular',
    description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
    time: '2 小时前',
    avatarGroup: [
      {
        tooltip: '貂蝉',
        src: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png'
      },
      {
        tooltip: '王昭君',
        src: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
      },
      {
        tooltip: '杨玉环',
        src: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
      },
    ],
  },
  {
    image: 'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
    title: 'Bootstrap',
    description: '那时候我只会想自己想要什么，从不想自己拥有什么',
    time: '8 小时前',
    avatarGroup: [
      {
        tooltip: '貂蝉',
        src: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png'
      },
      {
        tooltip: '王昭君',
        src: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
      },
      {
        tooltip: '杨玉环',
        src: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
      },
    ],
  },
  {
    image: 'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
    title: 'React',
    description: '那是一种内在的东西， 他们到达不了，也无法触及的',
    time: '10 小时前',
    avatarGroup: [
      {
        tooltip: '貂蝉',
        src: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png'
      },
      {
        tooltip: '王昭君',
        src: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
      },
      {
        tooltip: '杨玉环',
        src: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
      },
    ],
  },
  {
    image: 'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
    title: 'Vue',
    description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
    time: '12 小时前',
    avatarGroup: [
      {
        tooltip: '貂蝉',
        src: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png'
      },
      {
        tooltip: '王昭君',
        src: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
      },
      {
        tooltip: '杨玉环',
        src: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
      },
    ],
  },
  {
    image: 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
    title: 'Webpack',
    description: '生命就像一盒巧克力，结果往往出人意料',
    time: '14 小时前',
    avatarGroup: [
      {
        tooltip: '貂蝉',
        src: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png'
      },
      {
        tooltip: '王昭君',
        src: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
      },
      {
        tooltip: '杨玉环',
        src: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
      },
    ],
  },
];

const applicationList = [
  {
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    title: 'Alipay',
    users: [
      {
        desc: '活跃用户',
        count: '18',
      },
      {
        desc: '新增用户',
        count: '1,225',
      },
    ],
  },
  {
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
    title: 'Angular',
    users: [
      {
        desc: '活跃用户',
        count: '15',
      },
      {
        desc: '新增用户',
        count: '1,432',
      },
    ],
  },
  {
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
    title: 'Bootstrap',
    users: [
      {
        desc: '活跃用户',
        count: '15',
      },
      {
        desc: '新增用户',
        count: '1,743',
      },
    ],
  },
  {
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
    title: 'React',
    users: [
      {
        desc: '活跃用户',
        count: '19',
      },
      {
        desc: '新增用户',
        count: '1,081',
      },
    ],
  },
  {
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png',
    title: 'Vue',
    users: [
      {
        desc: '活跃用户',
        count: '10',
      },
      {
        desc: '新增用户',
        count: '1,225',
      },
    ],
  },
  {
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png',
    title: 'Webpack',
    users: [
      {
        desc: '活跃用户',
        count: '10',
      },
      {
        desc: '新增用户',
        count: '1,291',
      },
    ],
  },
];

const searchValue = ref<string>('');
function searchHandler(): void {
  emits('search', searchValue.value);
}

const activeName = ref<string>('articles');
function tabClickHandler(tab: TabsPaneContext, _event: Event): void {
  const name: string = tab.props.name as string;
  router.push(`/list/search/${name}`);
}
watch(
  () => props.activePane,
  (newVal) => {
    activeName.value = newVal;
  },
  {
    immediate: true,
  }
);

interface ICategory {
  label: string;
  value: string;
}
const categoryList: ICategory[] = [
  {
    label: '全部',
    value: '',
  },
  {
    label: '类目1',
    value: '1',
  },
  {
    label: '类目2',
    value: '2',
  },
  {
    label: '类目3',
    value: '3',
  },
  {
    label: '类目4',
    value: '4',
  },
  {
    label: '类目5',
    value: '5',
  },
  {
    label: '类目6',
    value: '6',
  },
  {
    label: '类目7',
    value: '7',
  },
  {
    label: '类目8',
    value: '8',
  },
  {
    label: '类目9',
    value: '9',
  },
  {
    label: '类目10',
    value: '10',
  },
  {
    label: '类目11',
    value: '11',
  },
  {
    label: '类目12',
    value: '12',
  },
];
// 单选
// const currentCategoryValue = ref<string>('');
// 多选
const currentCategoryValue = ref<string[]>(['']);
function categoryClickHandler(item: ICategory): void {
  // currentCategoryValue.value = item.value;
  const idx: number = currentCategoryValue.value.findIndex(obj => obj === item.value);
  if (idx === -1) {
    currentCategoryValue.value.push(item.value);
  } else {
    currentCategoryValue.value.splice(idx, 1);
  }
}
const toggleValue = ref<boolean>(false);
function toggleHandler(): void {
  toggleValue.value = !toggleValue.value;
}

const selectOwner = ref<string[]>(['2', '3']);
function selectOwnerHandler(value: string): void {
  selectOwner.value = [value];
}

const activeUser = ref<string>('');
const positiveRating = ref<string>('');

const spacer = h(ElDivider, { direction: 'vertical' });
</script>

<style lang="scss" scoped>
:deep(.el-input-group__append) {
  color: var(--el-color-white);
  background-color: var(--el-color-primary);
}

.project-pane {
  .card-box {
    :deep(.el-space__item) {
      width: 100%;
    }
  }
}

.application-pane {
  :deep(.el-card__footer) {
    padding: 10px;
    .el-space--horizontal {
      width: 100%;
      .el-space__item {
        flex: 1;
      }
    }
  }
}

.card-box {
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    .content-title {
      color: var(--el-color-primary);
    }
  }
}
.content-title {
  cursor: pointer;
  font-weight: bold;
  &:hover {
    color: var(--el-color-primary);
  }
}

.search-box {
  margin-top: 10px;
  :deep(.el-divider--horizontal) {
    margin: 14px 0;
  }
}
</style>