<script setup lang="ts">
import { Codemirror } from 'vue-codemirror'
import { oneDark } from '@codemirror/theme-one-dark'
import { yaml } from '@codemirror/lang-yaml'
import { EditorView } from '@codemirror/view'
import { ref, shallowRef } from 'vue'
import { keymap } from '@codemirror/view'
import { searchKeymap, search } from '@codemirror/search'

const code = ref(`console.log('Hello, world!')`)
const extensions = [
  yaml(),
  oneDark,
  EditorView.lineWrapping,
  search(),
  keymap.of([...searchKeymap])
]

// Codemirror EditorView instance ref
const view = shallowRef()
const handleReady = (payload: any) => {
  view.value = payload.view
}

const log = (title: string, value: Object) => {
  console.log(title, value)
}
</script>

<template>
  <el-card>
    <el-text size="large" tag="b">yaml编辑器</el-text>
    <codemirror
      v-model="code"
      placeholder="Code yaml goes here..."
      :style="{ height: '400px', width: '100%' }"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      @ready="handleReady"
      @change="log('change', $event)"
      @focus="log('focus', $event)"
      @blur="log('blur', $event)"
    />
  </el-card>
</template>

<style scoped></style>
