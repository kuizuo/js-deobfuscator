<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import draggable from 'vuedraggable'
import { IConfig, defaultConfig, configData } from '~/data/config'

const props = defineProps<{
  configList: IConfig[]
}>()

const { configList } = toReactive(props)

let nextId = ref(configList.length)
const drag = ref(false)
const dragOptions = computed(() => ({
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
}))

function addConfig(config: IConfig) {
  configList.push({
    ...config,
    id: nextId.value++,
  })
}

function removeConfig(config: IConfig) {
  configList.splice(
    configList.findIndex((item) => item.id === config.id),
    1,
  )
}

function disableConfig(config: IConfig) {
  let index = configList.findIndex((item) => item.id === config.id)
  configList[index].disable = !configList[index].disable
}

function clearConfig() {
  configList.length = 0
}

function reset() {
  configList.length = 0
  configList.push(...defaultConfig)
}
</script>

<template>
  <div class="mt-20 mb-2 text-center text-2xl font-semibold">配置列表</div>
  <div class="flex justify-between gap-20 flex-col" lg="flex-row">
    <div sm="w-full 100">
      <div border="1 solid" class="rounded-sm">
        <div p="x-2 y-1" border="b gray-400/10">
          <span>配置列表</span>
          <Icon
            icon="ant-design:delete-outlined"
            size="24"
            class="float-right"
            @click="clearConfig"
          ></Icon>
          <Icon
            icon="ant-design:reload-outlined"
            size="24"
            class="float-right"
            @click="reset"
          ></Icon>
        </div>
        <div p="x-1 y-1">
          <draggable
            v-model="configList"
            class="list-group"
            v-bind="dragOptions"
            :component-data="{
              tag: 'ul',
              type: 'transition-group',
              name: !drag ? 'flip-list' : null,
            }"
            @start="drag = true"
            @end="drag = false"
            item-key="id"
          >
            <template #item="{ element }">
              <li
                :class="`list-group-item ${element.disable ? 'disable' : ''}`"
                :key="element.id"
              >
                {{ element.name }}
                <el-input
                  v-if="element.arguments ?? ''"
                  size="small"
                  v-model="element.arguments"
                  draggable="false"
                  :style="{
                    width: element.arguments.length < 10 ? '150px' : '250px',
                    marginLeft: '5px',
                  }"
                  @onfocus="drag = false"
                >
                  <template #prepend style="padding: 0 5px">{{
                    element.label
                  }}</template>
                </el-input>
                <span class="flex float-right">
                  <Icon
                    icon="fe:disabled"
                    color="#9e9e9e"
                    size="24"
                    @click="disableConfig(element)"
                  ></Icon>
                  <Icon
                    icon="clarity:remove-line"
                    color="#9e9e9e"
                    size="24"
                    @click="removeConfig(element)"
                  ></Icon>
                </span>
              </li>
            </template>
          </draggable>
        </div>
      </div>
    </div>

    <div sm="w-full 100">
      <div class="flex flex-wrap gap-2">
        <div v-for="item in configData">
          <el-tooltip class="box-item" :content="item.content" placement="top">
            <el-button class="w-36" @click="addConfig(item)">{{
              item.name
            }}</el-button>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg-white {
  .splitpanes__pane {
    background-color: white;
  }

  :deep(.splitpanes__splitter) {
    background-color: #eee;
  }
}

.list-group {
  min-height: 20px;
  display: flex;
  -ms-flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  border-radius: 0.25rem;
}
.list-group-item {
  position: relative;
  display: block;
  padding: 0.25rem 0.25rem;
  color: #468847;
  background-color: #dff0d8;
  border-color: #d3e8c0;
  border-bottom-width: 1px;
  border-style: none none solid;
}

.disable {
  color: #b94a48;
  background-color: #f2dede;
}

.list-group-item i {
  cursor: pointer;
}

:deep(.el-card__header) {
  padding: 5px;
}
</style>
website/src/data/config
